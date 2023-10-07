import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { Dispatch, RootState } from "../store/store";

export const useAppDispatch = () => useDispatch<Dispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;