// components/LinkTable.tsx
import React, { useState, useEffect } from 'react';
import { FaShareAlt, FaCopy } from 'react-icons/fa';
import axios from '../util/axios';
import { Endpoint } from '@/util/constants';

interface LinkData {
  name: string;
  description: string;
  shortUrl: string;
}

const LinkTable: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalLink, setModalLink] = useState('');
  const [data, setData] = useState<LinkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Endpoint.FETCH_SHORTENURL); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const showModal = (url: string) => {
    setModalLink(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalLink('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(modalLink);
    alert('Copied to clipboard');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <table className="min-w-full bg-white border-collapse">
        <thead className="border-t border-gray-300">
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Description</th>
            <th className="py-2 px-4 border-b text-left">Shorten URL</th>
            <th className="py-2 px-4 border-b text-left">Share</th>
          </tr>
        </thead>
        <tbody>
          {data.map((link, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-left">{link.name}</td>
              <td className="py-2 px-4 border-b text-left">{link.description}</td>
              <td className="py-2 px-4 border-b text-left">
                <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="text-black no-underline">
                  {link.shortUrl}
                </a>
              </td>
              <td className="py-2 px-4 border-b text-left">
                <button onClick={() => showModal(link.shortUrl)} className="text-black no-underline">
                  <FaShareAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[464px] flex flex-col gap-[20px]">
            <h2 className="text-xl mb-4">View Full URL</h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Share Link</label>
              <div className="flex">
                <input
                  type="text"
                  value={modalLink}
                  readOnly
                  className="p-2 border border-gray-300 rounded-l-md w-full"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-gray-300 text-gray-700 rounded-r-md"
                >
                  <FaCopy />
                </button>
              </div>
            </div>
            <div className="flex justify-between gap-2 mt-4">
            <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkTable;
