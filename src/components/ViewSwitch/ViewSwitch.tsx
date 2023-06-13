import { IView } from '../../models/IView';
import { setCurrentViewIndex } from '../../store/features/views/viewsSlice';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';

export default function ViewSwitch({ views }: { views: IView[] }) {
    const { currentViewIndex } = useAppSelector((state) => state.views);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div>
                {views.map((view, index) => (
                    <button
                        key={view.name}
                        onClick={() => dispatch(setCurrentViewIndex(index))}
                    >
                        {view.name}
                    </button>
                ))}
            </div>
            <div>{views[currentViewIndex].component({})}</div>
        </div>
    );
}
