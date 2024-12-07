import clsx from 'clsx';

export type Tab = {
  label: string;
  value: string;
};

export type TabsProps = {
  data: Tab[];
  value: Tab;
  onSelect: (tab: Tab) => void;
};

export default function Tabs(props: TabsProps) {
  return (
    <div role="tablist" className="tabs tabs-bordered">
      {props.data.map((tab) => (
        <a
          key={tab.value}
          role="tab"
          onClick={() => props.onSelect(tab)}
          className={clsx('tab', {
            'tab-active': props.value.value === tab.value,
          })}
        >
          {tab.label}
        </a>
      ))}
    </div>
  );
}
