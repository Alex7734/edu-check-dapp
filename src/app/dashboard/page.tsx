import { contractAddress } from '@/config';
import {
  Account,
  SignMessage,
  PingPongService,
  Transactions, PingPongRaw
} from './widgets';
import { AuthRedirectWrapper } from '@/wrappers';
import { ClientHooks } from '@/components/ClientHooks';
import { Widget } from './components';
import { WidgetType } from '@/types/widget.types';
import Sidebar from '@/app/dashboard/components/Sidebar';

const WIDGETS: WidgetType[] = [
  {
    title: 'Account',
    widget: Account,
    description: 'Connected account details',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
  },
  {
    title: 'Verify CV',
    widget: PingPongRaw,
    description:
      'Smart Contract used to verify and sign your CV',
    reference: 'https://github.com/multiversx/mx-ping-pong-service',
    anchor: 'ping-pong-backend'
  },
  // {
  //   title: 'Upload Certification',
  //   widget: SignMessage,
  //   description: 'Upload certification about your skills to verify it on the chain',
  //   reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1',
  //   anchor: 'sign-message'
  // },
  // {
  //   title: 'Verifications Done',
  //   widget: Transactions,
  //   props: { receiver: contractAddress },
  //   description: 'List all verifications for your current CV',
  //   reference:
  //     'https://api.elrond.com/#/accounts/AccountController_getAccountTransactions'
  // }
];

export default function Dashboard() {
  return (
    <>
      <ClientHooks />
      <AuthRedirectWrapper>
        <div className='flex flex-col gap-6 max-w-4xl max-h-32 w-full'>
          {WIDGETS.map((element) => (
            <Widget key={element.title} {...element} />
          ))}
        </div>
      </AuthRedirectWrapper>
    </>
  );
}
