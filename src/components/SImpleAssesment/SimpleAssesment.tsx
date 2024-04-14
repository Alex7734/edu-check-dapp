import React, { type MouseEvent } from 'react';

const SimpleAssessmentComponent = ({ onClose, onConfirm }: {
  onClose: (e: MouseEvent) => void;
  onConfirm: (e: MouseEvent) => void;
}) => {
  return (
    <div className="bg-white p-6 max-w-4xl mx-auto my-8 w-[48rem]">
      <form className="mt-4 gap-12">
        <div className="mb-12">
          <label className="block text-md font-medium text-gray-700">What really is a smart contract?</label>
          <select
            className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="answer4">Nobody Knows</option>
            <option value="answer1">House Contract</option>
            <option value="answer2">Speeding Ticket</option>
            <option value="answer3">Chess Game</option>
          </select>
        </div>
        <div className="mb-12">
          <label className="block text-md font-medium text-gray-700">Is gilbert gottfried?</label>
          <select
            className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="answer4">Funny</option>
            <option value="answer1">God Freed</option>
            <option value="answer2">Alive</option>
            <option value="answer3">Dead</option>
          </select>
        </div>
        {/* ... add more questions as needed */}
        <div className="flex justify-between mt-32">
          <button type="button" onClick={onClose} className="inline-block rounded-lg px-6 py-2 text-center hover:no-underline my-0 bg-gray-200 text-white hover:bg-gray-300 mr-0 disabled:bg-gray-200 disabled:text-black text-sm disabled:cursor-not-allowed">Cancel</button>
          <button type="submit" onClick={onConfirm} className="inline-block rounded-lg px-6 py-2 text-center hover:no-underline my-0 bg-[#0FB587] text-white hover:bg-[#1FB599] mr-0 disabled:bg-gray-200 disabled:text-black text-sm disabled:cursor-not-allowed">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SimpleAssessmentComponent;
