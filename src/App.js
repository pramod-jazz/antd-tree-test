import React from 'react';

import './App.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { DatePicker } from 'antd';
import { Tree } from 'antd';

const { TreeNode } = Tree;




function App() {


  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'pramod',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'nikam',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'Kalyani',
          key: '0-0-1',
          children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
        },
      ],
    },
  ];
  
  const Demo = () => {
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };
  
    const onCheck = (checkedKeys, info) => {
      console.log('onCheck', checkedKeys, info);
    };
  
    return (
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
      />
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          <Demo></Demo>






          
        </p>
       
      </header>
    </div>
  );
}

export default App;
