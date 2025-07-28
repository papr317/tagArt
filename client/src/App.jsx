import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Image } from 'antd';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const fetchPaintings = () => {
    fetch('http://localhost:3000/api/paintings')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  return (
    <>
      <Modal
        title="Добавить картину"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        Тут будет форма добавления
      </Modal>

      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        + Новая картина
      </Button>

      <Table
        style={{ marginTop: 16 }}
        dataSource={data}
        rowKey="id"
        columns={[
          {
            title: 'Обложка',
            dataIndex: 'image',
            key: 'image',
            render: (url) => <Image width={80} src={url} />,
          },
          {
            title: 'Автор',
            dataIndex: 'author',
            key: 'author',
          },
          {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
          },
          {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
          },
          {
            title: 'Цена',
            dataIndex: 'price',
            key: 'price',
            render: (price) => `${price} ₽`,
          },
        ]}
      />
    </>
  );
}

export default App;
