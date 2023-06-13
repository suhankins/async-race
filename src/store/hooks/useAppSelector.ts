import { useSelector } from 'react-redux';
import { RootState } from '../rootStore';
import { TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
