'use client';
import { FormatAmount, OutputContainer, Label } from '@/components';
import { useGetAccountInfo, useGetNetworkConfig } from '@/hooks';

export const Account = () => {
  const { address, account } = useGetAccountInfo();
  const { network } = useGetNetworkConfig();
  const balance = '13200000000000000000';

  return (
    <OutputContainer>
      <div className='flex flex-col text-black' data-testid='topInfo'>
        <p className='truncate'>
          <Label>Address: </Label>
          <span data-testid='accountAddress'> {address}</span>
        </p>

        <p>
          <Label>Shard: </Label>
          {account.shard}
        </p>

        <p>
          <Label>Balance: </Label>
          <FormatAmount
            value={balance}
            egldLabel={network.egldLabel}
            data-testid='balance'
          />
        </p>
      </div>
    </OutputContainer>
  );
};
