import React from "react";
import { Tree, Input } from "antd";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import $ from "jquery";

import { CarryOutOutlined } from "@ant-design/icons";

const { DirectoryTree } = Tree;

const { Search } = Input;

const x = 3;
const y = 2;
const z = 1;
const gData = [];
let searchedParents = [];
let childrensWithActivePin = [];
let selectedTree;
const treeData = [
  {
    title: "Family",
    key: "Family",
    icon: <CarryOutOutlined />,
    children: [
      {
        title: "prashant",
        key: "prashant",
        icon: <CarryOutOutlined />,
        parentKey: "Family",

        children: [
          {
            title: "pramod",
            key: "pramod",
            icon: <CarryOutOutlined />,
            parentKey: "prashant",
            children: []
          },
          {
            title: "Tinu",
            key: "Tinu",
            icon: <CarryOutOutlined />,
            parentKey: "prashant",
            children: [
              {
                title: "Sanu",
                key: "Sanu",
                icon: <CarryOutOutlined />,
                parentKey: "Tinu"
              }
            ]
          },

          {
            title: "nikam",
            key: "nikam",
            icon: <CarryOutOutlined />,
            parentKey: "prashant",
            children: []
          }
        ]
      },

      {
        title: "Siddharth",
        key: "Siddharth",
        icon: <CarryOutOutlined />,
        parentKey: "Family",
        children: [
          {
            title: "Sourabh",
            key: "Sourabh",
            children: [],
            icon: <CarryOutOutlined />,
            parentKey: "Siddharth"
          },
          {
            title: "pravin",
            key: "pravin",
            icon: <CarryOutOutlined />,
            parentKey: "Siddharth",
            children: []
          }
        ]
      },
      {
        title: "Geeta",
        key: "Geeta",
        icon: <CarryOutOutlined />,
        parentKey: "Family",
        children: [
          {
            title: "Shraddha",
            key: "Shraddha",
            parentKey: "Geeta",
            children: []
          }
        ]
      }
    ]
  }
];

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || "0";
  const tns = _tns || gData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

const dataList = [];
const generateList = (data, prevNode) => {
  for (let i = 0; i < data.length; i++) {
    data[i].classesApplied = prevNode
      ? prevNode.classesApplied + " " + data[i].key
      : data[i].key;
    const node = data[i];
    const { key, parentKey } = node;
    dataList.push({
      key,
      title: key,
      parentKey: parentKey,
      classesApplied: "lorem"
    });
    if (node.children) {
      generateList(node.children, node);
    }
  }
};
generateList(treeData);

const getExpandsList = (parentKey, list) => {
  //expands.push(1);
  for (let i = 0; i < list.length; i++) {
    if (list[i].key && list[i].key === parentKey) {
      searchedParents.push(list[i].key);

      if (list[i].parentKey) {
        getExpandsList(list[i].parentKey, list);
      }
    }
  }
};

const setDefaultExpandsToLocalStorage = (key, list) => {
  console.log(">>>> Setting up default expand!");
  //expands.push(1);
  let defaultExpands = localStorage.getItem("defaultExpands");

  if (defaultExpands) {
    let previousDefaultExpands = JSON.parse(defaultExpands);
    previousDefaultExpands.push(key);
    localStorage.setItem(
      "defaultExpands",
      JSON.stringify(previousDefaultExpands)
    );
  } else {
    let tempKeys = [];
    tempKeys.push(key);
    localStorage.setItem("defaultExpands", JSON.stringify(tempKeys));
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].key && list[i].key === key) {
      searchedParents.push(list[i].key);

      if (list[i].children) {
        console.log(">>> In recusrsion");
        for (let j = 0; j < list[i].children.length; j++) {
          console.log(">>> In each children", list[i]);
          getExpandsList(list[i].children[j].key, list);
        }
      } else {
        console.log(">>> In else");
      }
    }
  }
};

const selectTreeNode = (key, tree) => {
   console.log(">>> Inside tree node cuntion") ;

   console.log(">>> Inside tree node cuntion: key" , key) ;
   console.log(">>> Inside tree node cuntion : tree", tree) ;
  if (tree.key === key) {
    console.log(">>> key matched", key) ;
    selectedTree = tree;
  } else {
  
        if (tree.children && tree.children.length !== 0) 
         {
            console.log("Tree has childre");

            tree.children.map( childItem => {
               console.log("%%%% each children", childItem); 
            if (childItem.key === key) {
              selectedTree = childItem;
            } else {
              console.log(">>> In each children", childItem);
              selectTreeNode(key, childItem);
            }
          });
        } 
      
  }
};

const setDefaultExpandsByIteratingTree = (key, tree) => {
  console.log("**** in default expands >> key is :", key);
  console.log("**** in default expands >> tree is :", tree);

  let allGreenStrings = localStorage.getItem("allGreens");

  if (allGreenStrings) {
    let previousGreens = JSON.parse(allGreenStrings);
    previousGreens.push(key);
    localStorage.setItem("allGreens", JSON.stringify(previousGreens));
  } else {
    let tempKeys = [];
    tempKeys.push(key);
    localStorage.setItem("allGreens", JSON.stringify(tempKeys));
  }

  console.log("***** child length : ", tree.children);

  if (tree.children) {
    $.each(tree.children, function(index, childItem) {
      console.log(">>> In each children", childItem);
      setDefaultExpandsByIteratingTree(childItem.key, childItem);
    });
  }
};

const getAllPinnedChildren = (key, tree, currentKey) => {
  console.log("**** getAll pinned cheldren >> key is :", key);
  console.log("**** getAll pinned cheldren >> tree is :", tree);
  if (key !== currentKey) {
    if ($("#" + key).hasClass("pin-search")) {
      childrensWithActivePin.push(key);
    }
  }

  if (tree.children) {
    $.each(tree.children, function(index, childItem) {
      console.log(">>> In each children", childItem);
      getAllPinnedChildren(childItem.key, childItem, currentKey);
    });
  }
};

const removeAllGreens = (key, tree) => {
  console.log("**** in remove greens >> key is :", key);
  console.log("**** in remove greens >> tree is :", tree);

  let allGreenStrings = localStorage.getItem("allGreens");

  if (allGreenStrings) {
    let previousGreens = JSON.parse(allGreenStrings);
    var newRemovedGreens = previousGreens.filter(function(a) {
      return a !== key;
    });
    localStorage.setItem("allGreens", JSON.stringify(newRemovedGreens));
  }

  //expands.push(1);

  console.log("***** child length : ", tree.children);

  if (tree.children) {
    $.each(tree.children, function(index, childItem) {
      console.log(">>> In each children", childItem);
      removeAllGreens(childItem.key, childItem);
    });
  }
};

class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: "",
    autoExpandParent: true,
    treeData: treeData
  };

  onExpand = expandedKeys => {
    console.log(">>> on expand");
    this.setState({
      expandedKeys,
      autoExpandParent: true
    });
  };

  retrieveNodes = searchKeyword => {
    return dataList.filter(
      item => item && item.key.indexOf(searchKeyword) !== -1
    );
  };

  onChange = e => {
    const { value } = e.target;

    // Getting back list of matched nodes by keyword in Search
    this.getAllParents(value);

    console.log("list of matched expanded keys by query", searchedParents);

    this.setState(
      {
        expandedKeys: searchedParents,
        searchValue: value,
        autoExpandParent: true
      },
      () => {
        searchedParents = [];
      }
    );
  };

  onDragEnter = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  OnNodeLoad = nodeId => {
    // alert("Node");
    console.log(">>>> Node loaded :", nodeId);
    //   let defaultExpandsString = localStorage.getItem("defaultExpands");

    //   if(defaultExpandsString){
    //     let defaultExpands = JSON.parse(defaultExpandsString);

    //     console.log(">>> In On Node Load : default expands : " , defaultExpands);

    //     defaultExpands.forEach((item, index, arr) => {

    //         console.log(">>> In On Node Load : each item : " , item);

    //           $("#"+ item).addClass("pin-search");

    //   });
    // }
  };

  OnPinClick = (event, targetKey, parentKey) => {
    console.log(">>> inside pin");

    event.preventDefault();
    event.stopPropagation();
    console.log(event);
    let clickedNodeKey = targetKey;

    console.log(">>> Node", clickedNodeKey);

    console.log(">>> Node 2", targetKey);

    if ($("#" + clickedNodeKey).hasClass("pin-search")) {
      console.log(">>>> Inside has class");

      // lets unpin item
      let pinnedItems = localStorage.getItem("pinnedItems");

      if (pinnedItems) {
        let previousPinnedItems = JSON.parse(pinnedItems);

        var newPins = previousPinnedItems.filter(function(a) {
          return a !== targetKey;
        });
        localStorage.setItem("pinnedItems", JSON.stringify(newPins));
      }

      // remove Greens logic

      this.getAllParents(parentKey);

      let anyParentGreen = false;

      if (searchedParents && searchedParents.length !== 0) {
        searchedParents.forEach(item => {
          if ($("#" + item).hasClass("pin-search")) {
            anyParentGreen = true;
          }
        });
      }

      searchedParents = [];

      if (!anyParentGreen) {
        console.log("**** No Parent Green!");
        //removeDefaultExpandsToLocalStorage(targetKey,dataList);
        let rootData =[...this.state.treeData];
        selectTreeNode(targetKey, rootData[0]);

        console.log("********* SELECTED TREE :", selectedTree);
        removeAllGreens(targetKey, selectedTree);
      }

      // check active pin children
      selectedTree = null;
      let rootData = [...this.state.treeData];
      selectTreeNode(targetKey, rootData[0] );
      childrensWithActivePin = [];
      getAllPinnedChildren(targetKey, selectedTree, targetKey);

      console.log("**** ACTIVe pin list: ", childrensWithActivePin);

      childrensWithActivePin.forEach(item => {
        console.log("**** Iterating active pin", item);
        selectedTree = null;
        let rootData = [...this.state.treeData];
        selectTreeNode(item, rootData[0]);

        console.log("********* SELECTED TREE :", selectedTree);

        setDefaultExpandsByIteratingTree(item, selectedTree);
      });

      // remove default expands 
      

      this.setState(
        {
          changed: true
        },
        () => {
          console.log("*** Set state is happening!");
        }
      );

      //
    } else {
      console.log(">>>> Inside don't have  class");

      selectedTree = null;
      let rootData = [...this.state.treeData];
      selectTreeNode(targetKey, rootData[0]);

      console.log("********* SELECTED TREE :", selectedTree);

      setDefaultExpandsByIteratingTree(targetKey, selectedTree);
      let defaultExpands = localStorage.getItem("defaultExpands");
      let pinnedItems = localStorage.getItem("pinnedItems");

      if (defaultExpands) {
        let previousDefaultExpands = JSON.parse(defaultExpands);
        previousDefaultExpands.push(parentKey);
        localStorage.setItem(
          "defaultExpands",
          JSON.stringify(previousDefaultExpands)
        );
      } else {
        let tempKeys = [];
        tempKeys.push(parentKey);
        localStorage.setItem("defaultExpands", JSON.stringify(tempKeys));
      }

      if (pinnedItems) {
        let previousPinnedItems = JSON.parse(pinnedItems);
        previousPinnedItems.push(targetKey);
        localStorage.setItem(
          "pinnedItems",
          JSON.stringify(previousPinnedItems)
        );
      } else {
        let tempKeys = [];
        tempKeys.push(targetKey);
        localStorage.setItem("pinnedItems", JSON.stringify(tempKeys));
      }

      this.setState(
        {
          changed: true
        },
        () => {
          console.log("*** Set state is happening!");
        }
      );
    }
  };

  onDrop = info => {
    console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };
    const data = [...this.state.treeData];
    //const data = treeData;

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.setState({
      treeData: data
    });
  };

  getAllParents(value) {
    const searchTargets = this.retrieveNodes(value);
    searchedParents = [];
    searchTargets.map(item => {
      getExpandsList(item.key, dataList);
    });
  }

  //   componentDidUpdate(){

  //       console.log(">>> In component did update");

  //       let pinnedItemsString = localStorage.getItem("pinnedItems");

  //       if(pinnedItemsString){
  //         let pinnedItems = JSON.parse(pinnedItemsString);

  //         console.log(">>> In component did update : pinned items : " , pinnedItems);

  //        pinnedItems.forEach((item) => {

  //             console.log(">>> In component did update : each item : " , item);

  //             $("#"+ item).addClass("pin-search");
  //             $("."+ item).each(function( index, value ) {

  //                 $(this).addClass("green");
  //       });

  //       });
  //     }

  //   }

  //   componentDidMount(){
  //     console.log(">>> In component did mount");

  //     let defaultExpandsString = localStorage.getItem("defaultExpands");

  //     if(defaultExpandsString){
  //       let defaultExpands = JSON.parse(defaultExpandsString);

  //       defaultExpands.forEach((item, index, arr) => {
  //           console.log(">>> Iterating every default expand");

  //              $("."+ item).each(function( index, value ) {
  //       console.log( index + ": " + value );
  //       $(this).addClass("pin-search");
  //     });

  //     });
  //   }

  // }

  render() {
    let allGreensString = localStorage.getItem("allGreens");
    let greens = [];
    if (allGreensString) {
      greens = JSON.parse(allGreensString);
      console.log(">>>>> all greens", greens);
    }

    let pinnedItemsString = localStorage.getItem("pinnedItems");
    let pinnedItems = [];
    if (pinnedItemsString) {
      pinnedItems = JSON.parse(pinnedItemsString);
      console.log(">>>>> all pinnedItems", pinnedItems);
    }

    let defaultExpandsString = localStorage.getItem("defaultExpands");

    let defaultExpands = [];
    if (defaultExpandsString) {
      defaultExpands = JSON.parse(defaultExpandsString);
      console.log(">>>>> default expands", defaultExpands);
    }

    console.log(">>>>> rendering");
    const { searchValue, expandedKeys, autoExpandParent } = this.state;

    console.log(">>> expanded keys in render ", expandedKeys);
    const loop = data =>
      data.map(item => {
        const index = item.title.indexOf(searchValue);
        const beforeStr = item.title.substr(0, index);
        const afterStr = item.title.substr(index + searchValue.length);
        const title =
          index > -1 ? (
            <span
              className={greens && greens.includes(item.key) ? "green" : ""}
            >
              {beforeStr}
              <span className="site-tree-search-value">{searchValue} </span>
              {afterStr}
              <span
                id={item.key}
                className={
                  item.classesApplied +
                  " " +
                  (pinnedItems && pinnedItems.includes(item.key)
                    ? "pin-search"
                    : "")
                }
              >
                {" "}
                <FontAwesomeIcon
                  onClick={e => this.OnPinClick(e, item.key, item.parentKey)}
                  icon={faThumbtack}
                />{" "}
              </span>
            </span>
          ) : (
            <span>
              <span
                className={greens && greens.includes(item.key) ? "green" : ""}
              >
                <span>
                  <span>{item.title}</span>{" "}
                </span>
              </span>
              <span
                id={item.key}
                className={
                  (pinnedItems && pinnedItems.includes(item.key)
                    ? "pin-search"
                    : "") +
                  " " +
                  item.classesApplied
                }
              >
                {" "}
                <FontAwesomeIcon
                  onClick={e => this.OnPinClick(e, item.key, item.parentKey)}
                  icon={faThumbtack}
                />
              </span>
            </span>
          );
        if (item.children) {
          return {
            title,
            key: item.key,
            parentKey: item.parentKey,
            children: loop(item.children)
          };
        }

        return {
          title,
          key: item.key,
          parentKey: item.parentKey
        };
      });
    console.log("in last return");

    let expands = [...this.state.expandedKeys];
    let allExpands = expands.concat(defaultExpands);

    console.log(">>>> All expands", allExpands);

    return (
      <div>
        <Search
          style={{ marginBottom: 8 }}
          placeholder="Search"
          onChange={this.onChange}
        />
        <DirectoryTree
          className="draggable-tree"
          onExpand={this.onExpand}
          expandedKeys={allExpands}
          autoExpandParent={this.state.autoExpandParent}
          treeData={loop(this.state.treeData)}
          draggable
          blockNode
          checkable
          showIcon={true}
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        />
      </div>
    );
  }
}

export default SearchTree;
