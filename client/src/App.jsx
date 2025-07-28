import React, { useState } from 'react';
import { Button, message, Modal, Table, Popconfirm } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import './App.css';

function App() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const info = () => {
    messageApi.success('Hello, Ant Design!');
  };

  const fetchData = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:3000/api/todos`, requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        Здесь любые элементы
      </Modal>
      {contextHolder}
      <Button type="primary" onClick={info}>
        Display normal message
      </Button>

      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Open Modal
      </Button>
      <Button
        onClick={() => {
          fetchData();
        }}
      >
        😀
      </Button>
      <Table
        size="small"
        dataSource={data}
        columns={[
          {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: 'title',
            dataIndex: 'title',
            key: 'title',
          },
          {
            title: 'completed',
            dataIndex: 'completed',
            key: 'completed',
          },
          {
            title: 'Delete',
            dataIndex: 'del',
            key: 'del',
            render: (text) => (
              <span onClick={() => alert('вызов удаления')} style={{ cursor: 'pointer' }}>
                ❌
              </span>
            ),
          },
        ]}
      />
      <Popconfirm
        title="Удалить запись?"
        description="Подтверждение удаления"
        onConfirm={() => console.log('Deleted')}
        onCancel={() => console.log('Canceled')}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </>
  );
}

export default App;










// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Table, Image } from 'antd';
// import './App.css';

// function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);

//   const fetchPaintings = () => {
//     fetch('http://localhost:3000/api/paintings')
//       .then((res) => res.json())
//       .then((json) => {
//         setData(json);
//       });
//   };

//   useEffect(() => {
//     fetchPaintings();
//   }, []);

//   return (
//     <>
//       <Modal
//         title="Добавить картину"
//         open={isModalOpen}
//         onOk={() => setIsModalOpen(false)}
//         onCancel={() => setIsModalOpen(false)}
//       >
//         Тут будет форма добавления
//       </Modal>

//       <Button type="primary" onClick={() => setIsModalOpen(true)}>
//         + Новая картина
//       </Button>

//       <Table
//         style={{ marginTop: 16 }}
//         dataSource={data}
//         rowKey="id"
//         columns={[
//           {
//             title: 'Обложка',
//             dataIndex: 'image',
//             key: 'image',
//             render: (url) => <Image width={80} src={url} />,
//           },
//           {
//             title: 'Автор',
//             dataIndex: 'author',
//             key: 'author',
//           },
//           {
//             title: 'Описание',
//             dataIndex: 'description',
//             key: 'description',
//           },
//           {
//             title: 'Дата',
//             dataIndex: 'date',
//             key: 'date',
//           },
//           {
//             title: 'Цена',
//             dataIndex: 'price',
//             key: 'price',
//             render: (price) => `${price} ₽`,
//           },
//         ]}
//       />
//     </>
//   );
// }

// export default App;
