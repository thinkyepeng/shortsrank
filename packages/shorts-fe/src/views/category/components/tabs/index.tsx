import './tabs.css'

export type TabsOption = {
  label: string,
  value: string|number,
}
export type TabsProps = {
  options: TabsOption[],
  value: string|number,
  onChange: (value:string|number) => void
}

type TabItemType = {
  data: TabsOption,
  active?: boolean,
  onChange: (value:string|number) => void,
}

function TabItem(props: TabItemType) {
  if (!props.active) {
    return (
      <div className="cat-tab-10">
        <button
          type="button"
          className="cat-tab-11"
          onClick={() => props.onChange(props.data.value)}
        >
          <span className="cat-tab-12"></span>
          <span className="cat-tab-13">
            <span className="cat-tab-14">{props.data.label}</span>
          </span>
        </button>
      </div>
    )
  }
  return (
    <div className="cat-tab-5">
      <button  
        type="button"
        className="cat-tab-6"
        onClick={() => props.onChange(props.data.value)}
      >
        <span className="cat-tab-7"></span>
        <span className="cat-tab-8">
          <span className="cat-tab-9">{props.data.label}</span>
        </span>
      </button>
    </div>
  )
}

export default function Tabs(props: TabsProps) {
  return (
    <div className="pt-[56px]">
      <div className="cat-tab-1">
        <div className="cat-tab-2">
          <p className="cat-tab-3">Category</p>
          <div className="cat-tab-4">
            {props.options.map(option => (
              option.value === props.value ? 
                <TabItem data={option} key={option.value} active onChange={props.onChange} />: 
                <TabItem data={option} key={option.value} onChange={props.onChange} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}