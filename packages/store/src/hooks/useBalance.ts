import { balanceAtom } from "../atoms/balance";
import { useRecoilValue } from "recoil";

export const useBalance = () => {return useRecoilValue(balanceAtom)}