import { useIsFetching } from "@tanstack/react-query";
import { useNavigation } from "react-router";

const ProgressLoader = () => {
  const navigation = useNavigation();
  const fetching = useIsFetching() > 0;

  if (fetching || navigation.state !== "idle") {
    return (
      <div className="fixed top-0 left-0 z-50 h-0.5 w-full overflow-hidden bg-green-50">
        <div className="animate-progress absolute h-full w-full bg-green-600" />
      </div>
    );
  }
};

export default ProgressLoader;
