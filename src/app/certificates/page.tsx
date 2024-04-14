import {
  SignMessage,
} from './widgets';
import { AuthRedirectWrapper } from '@/wrappers';
import { ClientHooks } from '@/components/ClientHooks';
import { Widget } from './components';
import { WidgetType } from '@/types/widget.types';
import TxList from '../../../public/assets/img/list.svg'
import Image from 'next/image';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const WIDGETS: WidgetType[] = [
  {
    title: 'Upload Certification',
    widget: SignMessage,
    description: 'Upload certification about your skills to verify it on the chain',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account-1',
    anchor: 'sign-message',
    icon: faUpload
  },
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
        <div className='flex flex-col max-w-4xl max-h-24 w-full'>
          {WIDGETS.map((element) => (
            <Widget key={element.title} {...element} />
          ))}
          <Image className={'w-[112%] h-fit'} src={TxList} alt={'List of transactions'} />
        </div>
      </AuthRedirectWrapper>
    </>
  );
}
