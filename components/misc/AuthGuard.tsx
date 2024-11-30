import { listenToAuthChanges } from "@/features/auth/slice";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthGuard({ children }: PropsWithChildren) {
  const dispatch = useDispatch();

  useEffect(() => {
    listenToAuthChanges()(dispatch);
  }, [dispatch]);

  return <>{children}</>;
}
