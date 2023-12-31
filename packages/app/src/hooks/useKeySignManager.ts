import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import { useMemo } from "react";
import { useNetwork } from "wagmi";
import {KeySignManager} from "@/src/lib/keySignManager";

export default function useKeySignManager() {
  const addresses = usePackdAddresses();
  const network = useNetwork();

  // TODO - salt could change kodam??
  return useMemo(
    () =>
      new KeySignManager(
        network.chain?.id ?? 31337,
        "0x3000000000000000000000000000000000000000000000000000000000000000",
        addresses.PackMain
      ),
    [network.chain?.id, addresses.PackMain]
  );
}
