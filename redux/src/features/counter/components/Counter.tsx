import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  increment,
  decrement,
  // incrementByAmount,
  // adultUsers,
} from "@/store/counterSlice";

function Counter() {
  const count = useAppSelector((state) => state.counter.value); // approach 1
  // const count = useAppSelector(counter); // approach 2

  // const adultUsersLength = useAppSelector(adultUsers);
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-center gap-4">
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      <h1 className="text-3xl font-bold">{count}</h1>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      {/* <Button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </Button>

      <h2 className="text-2xl font-bold mt-5">Adult Users</h2>
      <ul>{adultUsersLength}</ul> */}
    </div>
  );
}

export default Counter;
