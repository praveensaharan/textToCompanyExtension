import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input } from "antd";

const Baseurl = "https://s3-to-emai.vercel.app";

const Result = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Baseurl}/database/tableextension`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `${Baseurl}/database/searchextension/${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(response.data);
      setSearchLoading(false);
    } catch (error) {
      console.error("Error fetching search results", error);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setSearchLoading(true);
      setTypingTimeout(setTimeout(() => fetchSearchResults(), 2000));
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      className: "text-center whitespace-nowrap p-1",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Emails",
      key: "emails",
      render: (text, record) => {
        const emails = [
          record.email1,
          record.email2,
          record.email3,
          record.email4,
          record.email5,
          record.email6,
        ]
          .filter((email) => email)
          .join(", ");
        return <span>{emails}</span>;
      },
      className: "whitespace-nowrap p-1",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
  ];

  const dataSource = searchQuery.trim() !== "" ? searchResults : data;

  return (
    <div className="container mx-auto p-1 mt-5 mb-2">
      <Input
        placeholder="Search...(2s delay)"
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full sm:w-1/2 mb-4 p-2 border-2 border-customLightRed rounded-xl"
      />
      <p className="text-2xl font-semibold text-black mb-4">Top 200 Data</p>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading || searchLoading}
        rowKey="id"
        className="bg-transparent shadow-lg"
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Result;
