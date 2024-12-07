import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { JSX } from 'react';
import { useTabs } from '@/hooks/use-tabs';
import { usePost } from '@/hooks/use-post';
import { SolutionResponse } from '@/types/solution';
import Tabs from './tabs';
import { tabs } from '@/constants';

const schema = z.object({
  input: z.string(),
});

export type SolutionSchemaType = z.infer<typeof schema>;

export type SolutionProps = {
  name: string;
  url: string;
  defaultValue: SolutionSchemaType['input'];
  visual?: (response?: SolutionResponse) => JSX.Element;
};

export default function Solution({
  defaultValue,
  url,
  name,
  visual,
}: SolutionProps) {
  const { tab, setTab } = useTabs();
  const { data, trigger } = usePost<SolutionSchemaType, SolutionResponse>(
    `/${url}/${tab.value === tabs[0].value ? 'part-one' : 'part-two'}`
  );
  const handleSubmit = (data: SolutionSchemaType) => {
    trigger(data);
  };

  const form = useForm<SolutionSchemaType>({
    defaultValues: {
      input: defaultValue,
    },
    resolver: zodResolver(schema),
  });

  return (
    <div className="h-full w-full flex-col flex flex-1 gap-8">
      <h1>{name}</h1>
      <Tabs data={tabs} value={tab} onSelect={setTab} />
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col lg:flex-row h-full"
      >
        <div className="card bg-base-300 w-full mr-4 rounded-box grid flex-grow place-items-center">
          <textarea
            {...form.register('input')}
            className="textarea w-full h-full inline-flex flex-1 textarea-bordered"
            placeholder="Input"
          ></textarea>
        </div>
        <div className="divider lg:divider-horizontal">
          <button className="btn btn-circle">GO</button>
        </div>
        <div className="flex w-full ml-4 flex-col border-opacity-50">
          <div className="card h-full bg-base-300 rounded-box flex place-items-center">
            {visual ? visual(data) : 'No visual'}
          </div>
          <div className="divider"></div>
          <div className="card h-full bg-base-300 rounded-box flex place-items-center">
            <ul>
              <li>
                Result: <span>{data?.result}</span>
              </li>
              <li>
                Ellapsed: <span>{data?.ellapsed}ms</span>
              </li>
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
}
