import { AuthRedirectWrapper } from '@/wrappers';
import { ClientHooks } from '@/components/ClientHooks';
import Image from 'next/image';
import Courses from '../../../public/assets/img/courses.svg';
export default function Dashboard() {
  return (
    <>
      <ClientHooks />
      <AuthRedirectWrapper>
        <div className='flex flex-col gap-6 max-w-4xl max-h-32 w-full'>
          <Image className={'w-[115%] h-fit'} src={Courses} alt={'List of transactions'} />
        </div>
      </AuthRedirectWrapper>
    </>
  );
}
