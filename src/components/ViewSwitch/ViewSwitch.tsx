import { IView } from '../../views/IView';
import { setCurrentViewIndex } from '../../store/features/views/viewsSlice';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';

export default function ViewSwitch({ views }: { views: IView[] }) {
    const { currentViewIndex } = useAppSelector((state) => state.views);
    const dispatch = useAppDispatch();

    return (
        <>
            <header className="btn-group">
                {views.map((view, index) => (
                    <button
                        key={view.name}
                        onClick={() => dispatch(setCurrentViewIndex(index))}
                        className="btn btn-outline-primary"
                        disabled={index === currentViewIndex}
                    >
                        {view.name}
                    </button>
                ))}
            </header>
            <main>{views[currentViewIndex].component}</main>
        </>
    );
}
