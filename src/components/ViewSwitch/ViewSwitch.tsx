import { IView } from '../../models/IView';

export function ViewSwitch({
    views,
    currentViewIndex,
    setCurrentViewIndex,
}: {
    views: IView[];
    currentViewIndex: number;
    setCurrentViewIndex: (index: number) => void;
}) {
    return (
        <div>
            <div>
                {views.map((view, index) => (
                    <button
                        key={view.name}
                        onClick={() => setCurrentViewIndex(index)}
                    >
                        {view.name}
                    </button>
                ))}
            </div>
            <div>{views[currentViewIndex].component({})}</div>
        </div>
    );
}
