from agents import Agent, Runner, function_tool
import asyncio
from openai.types.responses import ResponseTextDeltaEvent

@function_tool 
def add(a: int, b: int) -> int:
    """Adds two numbers together."""
    return a + b

@function_tool
def subtract(a: int, b: int) -> int:
    """Subtracts b from a."""
    return a - b

@function_tool
def multiply(a: int, b: int) -> int:
    """Multiplies two numbers."""
    return a * b

@function_tool
def divide(a: int, b: int) -> float:        
    """Divides a by b."""
    if b == 0:
        raise ValueError("Cannot divide by zero.")
    return a / b


agent = Agent("Assistant", 
              instructions="""
                You are a helpful assistant that can perform basic arithmetic operations using the provided tools.
                Use the tools when necessary to answer user queries related to arithmetic.
                you have access to the following tools:
                1. add(a: int, b: int) -> int: Adds two numbers together.
                2. subtract(a: int, b: int) -> int: Subtracts b from a.
                3. multiply(a: int, b: int) -> int: Multiplies two numbers.
                4. divide(a: int, b: int) -> float: Divides a by b.
                """,
              model="gpt-4.1-nano",
              tools=[add, subtract, multiply, divide])


# Run the agent with a synchronous 
# result = Runner.run_sync(agent, "write a meme joke about developers ")
# print(result.final_output)


#Run the agent with an asynchronous interaction
async def async_interaction():
    result = await Runner.run(agent , "Write a meme joke about developers")
    print(result.final_output)

# Run the agent with an asynchronous streaming interaction
async def async_streaming_interaction():
    response = Runner.run_streamed(agent, "Calculate the result of (15 + 5) * (10 - 2) / 5")
    async for event in response.stream_events():
        if event.type == "raw_response_event":
            if(isinstance(event.data, ResponseTextDeltaEvent)):
                # print(f"{event.data.sequence_number}:{event.data.delta}\n", end='', flush=True)
                print(event.data.delta, end='', flush=True)
        else:
            if (event.type == "run_item_stream_event"):
                if (event.name == "tool_called"):
                    print(f"Tool Called: {event.item.raw_item.name}")
                    print(f"Tool Args: {event.item.raw_item.arguments}")
                if (event.name == "tool_output"):
                    print(f"Tool Output: {event.item.raw_item['output']}")




if __name__ == "__main__":
    # asyncio.run(async_interaction())
    asyncio.run(async_streaming_interaction())