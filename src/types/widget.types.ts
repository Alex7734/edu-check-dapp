import { TransactionsPropsType } from '@/app/dashboard/widgets/Verifications/types';

export type WidgetProps = {
  callbackRoute: string;
};

export type WidgetType<T = WidgetProps & TransactionsPropsType> = {
  title: string;
  widget: (props: T) => JSX.Element;
  description?: string;
  props?: { receiver?: string };
  reference: string;
  anchor?: string;
  icon?: any;
};
