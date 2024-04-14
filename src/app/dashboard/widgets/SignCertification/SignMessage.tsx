'use client';
import React, { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import {
  faFileSignature,
  faBroom,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetSignMessageSession } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignMessageSession';
import { Button } from '@/components/Button';
import { OutputContainer } from '@/components/OutputContainer';
import { useSignMessage } from '@/hooks';
import { SignedMessageStatusesEnum, WidgetProps } from '@/types';
import { SignFailure, SignSuccess } from './components';
import CryptoJS from 'crypto-js';
import { useModal } from '@/wrappers/BatchTransactionsContextProvider/AssesmentProvider';
import SimpleAssessmentComponent from '@/components/SImpleAssesment/SimpleAssesment';

export const SignMessage = ({ callbackRoute }: WidgetProps) => {
  const { sessionId, signMessage, onAbort } = useSignMessage();
  const messageSession = useGetSignMessageSession(sessionId);
  const { showModal, hideModal } = useModal();
  const [message, setMessage] = useState('');
  const [fileName, setFileName] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(ev: ProgressEvent<FileReader>) {
      const result = ev.target?.result;
      if (!result) {
        return;
      }

      const wordArray = CryptoJS.lib.WordArray.create(result as Uint8Array);
      const hash = CryptoJS.SHA256(wordArray).toString();
      setMessage(hash);
      setFileName(file.name);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleStartAssessment = () =>
    showModal(<SimpleAssessmentComponent onClose={hideModal} onConfirm={handleSubmit} />, 'Test Assessment');

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    hideModal();

    if (messageSession) {
      onAbort();
    }

    if (!message.trim()) {
      return;
    }

    signMessage({
      message,
      callbackRoute
    });

    setShowLoading(true);
    setMessage('');
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAbort();
  };

  const isError = messageSession
    ? [
    (SignedMessageStatusesEnum.cancelled, SignedMessageStatusesEnum.failed)
  ].includes(messageSession.status) && messageSession?.message
    : false;

  const isSuccess =
    messageSession?.status === SignedMessageStatusesEnum.signed;

  useEffect(() => {
    if (isSuccess) {
      setShowLoading(false);
    }
  }, [isSuccess]);


  console.log(showLoading);
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-2 items-start'>
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".txt"
          className='file-input'
        />
        <Button
          data-testid='signMsgBtn'
          onClick={handleStartAssessment}
          disabled={!message}
        >
          <FontAwesomeIcon icon={faFileSignature} className='mr-1' />
          Sign
        </Button>

        {(isSuccess || isError) && (
          <Button
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
          >
            <FontAwesomeIcon
              icon={isSuccess ? faBroom : faArrowsRotate}
              className='mr-1'
            />
            {isError ? 'Try again' : 'Clear'}
          </Button>
        )}
      </div>
      <OutputContainer>
        {!fileName && !isSuccess && !isError && <div>
          Upload your certification to be signed...
        </div>}

        {showLoading && <div>Signing...</div>}

        {!isSuccess && !isError && fileName && !showLoading && (
          <div>Ready to sign: {fileName}</div>
        )}

        {isSuccess && (
          <SignSuccess messageToSign={messageSession?.message ?? ''} />
        )}

        {isError && <SignFailure />}
      </OutputContainer>
    </div>
  );
}
