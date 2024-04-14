import { useGetNetworkConfig } from '@/hooks';
import { ExplorerLink } from '@/components/sdkDappComponents';
import { TRANSACTIONS_ENDPOINT } from '@multiversx/sdk-dapp/apiCalls/endpoints';
import { getTransactionUrl, useTransactionOutcome } from '@/helpers';
import { Label } from '@/components/Label';

export const Transaction = () => {
  const { network } = useGetNetworkConfig();
  const transactionUrl = getTransactionUrl(network.walletAddress);

  const txData = useTransactionOutcome();

  return (
    <div className='flex flex-col gap-2 text-sm'>
      <a
        href={transactionUrl}
        className='self-start inline-block rounded-lg px-3 py-2 text-center hover:no-underline my-0 bg-transparent hover:bg-[#0FB587] text-[#0FB587] hover:text-white mr-0 border-solid border-green-300 border-[1px]'
      >
        Upload your CV to the blockchain
      </a>
      {txData.status && (
        <p>
          <Label>Transaction status:</Label> {txData.status}
        </p>
      )}
      {txData.address && (
        <p>
          <Label>Sender:</Label> {txData.address}
        </p>
      )}
      {txData.txHash && (
        <p>
          <Label>Hash:</Label>
          <ExplorerLink
            page={`/${TRANSACTIONS_ENDPOINT}/${txData.txHash}`}
            className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
          >
            {txData.txHash}
          </ExplorerLink>
        </p>
      )}
    </div>
  );
};
