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
let allParents = [];
let searchedParents = [];
let childrensWithActivePin = [];
let selectedTree;
const treeData = [
    {
        key: 25,
        
        title: "SST",
        "description": "SST Super Market Items",
        icon: <CarryOutOutlined />,

        subcategories: [
            {
                key: 26,
                title: "Dairy",
                "description": "Dairy Products",
                parentKey: 25,
                icon: <CarryOutOutlined />,
                subcategories: [
                    {
                        key: 27,
                        title: "Milk",
                        "description": "Milk Varieties",
                        parentKey: 26,
                        subcategories: [],
                        "itemDtos": [],
                        "itemStoreAllDto": [
                            {
                                key: 1,
                                "itemId": 1,
                                title: "Nandini Pasteurised Toned Milk",
                                "categoryId": 27,
                                "categoryName": "Milk",
                                "imgPath": "images/items/Nandini_Pasteurised_Toned_Milk.png",
                                "isActive": true,
                                "storeId": 1,
                                "taxRateId": 0,
                                "minStock": 20,
                                parentKey : 27,
                                "size": 0,
                                "cancellationNotes": {
                                    "Subscription": "You can cancel the nextday delivery before 11pm",
                                    "Order": "You can cancel even one hour after delivery"
                                },
                                "qty": {
                                    "total": "100",
                                    "expiry_date_today": "25",
                                    "expiry_date_tomorrow": "75"
                                },
                                "physicalAttrs": {
                                    "length": "10",
                                    "breadth": "50",
                                    "weight": "30"
                                },
                                "instructions": [
                                    "Handle with care"
                                ],
                                "active": true
                            },
                            {
                                key: 2,
                                "itemId": 2,

                                title: "Nandini Shubham Pasteurized Standardized Milk",
                                "categoryId": 27,
                                "categoryName": "Milk",
                                "imgPath": "images/items/Nandini_Shubham_Pasteurized_Standardized_Milk.png",
                                "isActive": true,
                                "storeId": 1,
                                parentKey : 27,
                                "taxRateId": 0,
                                "minStock": 20,
                                "size": 0,
                                "cancellationNotes": {
                                    "Subscription": "You can cancel the nextday delivery before 11pm",
                                    "Order": "You can cancel even one hour after delivery"
                                },
                                "qty": {
                                    "total": "100",
                                    "expiry_date_today": "25",
                                    "expiry_date_tomorrow": "75"
                                },
                                "physicalAttrs": {
                                    "length": "10",
                                    "breadth": "50",
                                    "weight": "30"
                                },
                                "instructions": [
                                    "Handle with care"
                                ],
                                "active": true
                            }
                        ],
                        "merchantId": 1,
                        "mechantId": 1,
                        "parentId": 26
                    },
                    {
                        key: 28,
                        title: "Curd",
                        "description": "Curd Varieties",
                        parentKey: 26,
                        subcategories: [],
                        "itemDtos": [],
                        "itemStoreAllDto": [
                            {
                                key: 3,
                                "itemId": 3,
                                title: "Nandini Curd",
                                parentKey : 28,
                                "categoryId": 28,
                                "categoryName": "Curd",
                                "imgPath": "images/items/Nandini_Curd.png",
                                "isActive": true,
                                "storeId": 1,
                                "taxRateId": 0,
                                "minStock": 20,
                                "size": 0,
                                "cancellationNotes": {
                                    "Subscription": "You can cancel the nextday delivery before 11pm",
                                    "Order": "You can cancel even one hour after delivery"
                                },
                                "qty": {
                                    "total": "100",
                                    "expiry_date_today": "25",
                                    "expiry_date_tomorrow": "75"
                                },
                                "physicalAttrs": {
                                    "length": "10",
                                    "breadth": "50",
                                    "weight": "30"
                                },
                                "instructions": [
                                    "Handle with care"
                                ],
                                "active": true
                            }
                        ],
                        "merchantId": 1,
                        "mechantId": 1,
                        "parentId": 26
                    }
                ],
                "itemDtos": [],
                "itemStoreAllDto": [],
                "merchantId": 1,
                "mechantId": 1,
                "parentId": 25
            },
            {
                key: 29,
                title: "Bakery",
                "description": "Bakery Products",
                parentKey: 25,
                subcategories: [
                    {
                        key: 30,
                        title: "Bread",
                        "description": "Bread Varieties",
                        parentKey: 29,
                        subcategories: [
                            {
                                key: 31,
                                title: "Milk Bread",
                                "description": "Milk Bread Varieties",
                                parentKey: 30,
                                subcategories: [],
                                "itemDtos": [],
                                "itemStoreAllDto": [],
                                "merchantId": 1,
                                "mechantId": 1,
                                "parentId": 30
                            },
                            {
                                key: 32,
                                title: "Wheat Bread",
                                "description": "Wheat Bread Varieties",
                                parentKey: 30,
                                subcategories: [],
                                "itemDtos": [],
                                "itemStoreAllDto": [
                                    {
                                        key: 4,
                                        "itemId": 4,
                                        title: "Britannia 100% Whole Wheat Bread",
                                        parentKey : 32,
                                        "categoryId": 32,
                                        "categoryName": "Wheat Bread",
                                        "imgPath": "images/items/Britannia_100pct_Whole_Wheat.png",
                                        "isActive": true,
                                        "storeId": 1,
                                        "taxRateId": 0,
                                        "minStock": 20,
                                        "size": 0,
                                        "cancellationNotes": {
                                            "Subscription": "You can cancel the nextday delivery before 11pm",
                                            "Order": "You can cancel or return before expiry date"
                                        },
                                        "qty": {
                                            "total": "10",
                                            "expiry_date_today": "3",
                                            "expiry_date_tomorrow": "7"
                                        },
                                        "physicalAttrs": {
                                            "length": "10",
                                            "breadth": "50",
                                            "weight": "30"
                                        },
                                        "instructions": [
                                            "Handle with care"
                                        ],
                                        "active": true
                                    }
                                ],
                                "merchantId": 1,
                                "mechantId": 1,
                                "parentId": 30
                            }
                        ],
                        "itemDtos": [],
                        "itemStoreAllDto": [],
                        "merchantId": 1,
                        "mechantId": 1,
                        "parentId": 29
                    }
                ],
                "itemDtos": [],
                "itemStoreAllDto": [],
                "merchantId": 1,
                "mechantId": 1,
                "parentId": 25
            }
        ],
        "itemDtos": [],
        "itemStoreAllDto": [],
        "merchantId": 1,
        "mechantId": 1,
        "parentId": null
    }
];

const generateData = (_level, _preKey, _tns) => {
    console.log("**** gen data")
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
    const { key, parentKey , title, subcategories} = node;
    dataList.push({
      key,
      title: title,
      parentKey: parentKey,
      classesApplied: "lorem"
    });



    if (node.subcategories && node.subcategories.length !== 0 ) {
        
      generateList(node.subcategories, node);
    }else if(node.subcategories && node.itemStoreAllDto && node.itemStoreAllDto.length !== 0) {
        generateList(node.itemStoreAllDto,node);

    }
  }
};
console.log("^^^^^^^^^ Listing is happening ^^^^^^^");
generateList(treeData);


console.log(">>>>>> DATA LIST", dataList);

const getExpandsList = (parentKey, list) => {

  console.log(">>>>>> GET EXPANDS LIST CALLED")  
//getExpandsList.push();
  for (let i = 0; i < list.length; i++) {
    if (list[i].key && list[i].key === parentKey) {
      searchedParents.push(list[i].key);

      if (list[i].parentKey) {
        getExpandsList(list[i].parentKey, list);
      }
    }
  }
};


const getParentsByKeyList = (parentKey, list) => {

    console.log(">>>>>> GET EXPANDS LIST CALLED")  
  //getExpandsList.push();
    for (let i = 0; i < list.length; i++) {
      if (list[i].key && list[i].key === parentKey) {
        allParents.push(list[i].key);
  
        if (list[i].parentKey ) {
            getParentsByKeyList(list[i].parentKey, list);
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
  
        if (tree.subcategories && tree.subcategories.length !== 0) 
         {
            console.log("Tree has childre");

            tree.subcategories.map( childItem => {
               console.log("%%%% each children", childItem); 
            if (childItem.key === key) {
              selectedTree = childItem;
            } else {
              console.log(">>> In each children", childItem);
              selectTreeNode(key, childItem);
            }
          });
         }
         else if(tree.subcategories && tree.itemStoreAllDto && tree.itemStoreAllDto.length !== 0){
            console.log("Tree item dto childre");

            tree.itemStoreAllDto.map( childItem => {
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

  console.log("*** What happened to tree", tree);

  if (tree.subcategories && tree.subcategories.length !== 0 ) {
    $.each(tree.subcategories, function(index, childItem) {
      
      setDefaultExpandsByIteratingTree(childItem.key, childItem);
    });
  }else if(tree.subcategories &&  tree.itemStoreAllDto &&  tree.itemStoreAllDto.length !== 0 ){

    $.each(tree.itemStoreAllDto, function(index, childItem) {
      
        setDefaultExpandsByIteratingTree(childItem.key, childItem);
      });
  }
};

const getAllPinnedChildren = (key, tree, currentKey) => {

  if (key !== currentKey) {
    if ($("#" + key).hasClass("pin-search")) {
      childrensWithActivePin.push(key);
    }
  }

  if (tree.subcategories && tree.subcategories.length !== 0 ) {
    $.each(tree.subcategories, function(index, childItem) {
    
      getAllPinnedChildren(childItem.key, childItem, currentKey);
    });
  } else if (tree.subcategories && tree.itemStoreAllDto && tree.itemStoreAllDto.length !== 0 ) {
    $.each(tree.itemStoreAllDto, function(index, childItem) {
    
        getAllPinnedChildren(childItem.key, childItem, currentKey);
      });
}
};

const removeAllGreens = (key, tree) => {
 

  let allGreenStrings = localStorage.getItem("allGreens");

  if (allGreenStrings) {
    let previousGreens = JSON.parse(allGreenStrings);
    var newRemovedGreens = previousGreens.filter(function(a) {
      return a !== key;
    });
    localStorage.setItem("allGreens", JSON.stringify(newRemovedGreens));
  }

  //expands.push(1);



  if (tree.subcategories && tree.subcategories.length !== 0) {
    $.each(tree.subcategories, function(index, childItem) {
 
      removeAllGreens(childItem.key, childItem);
    });
  } else if(tree.subcategories && tree.itemStoreAllDto &&  tree.itemStoreAllDto.length !== 0) {
    $.each(tree.itemStoreAllDto, function(index, childItem) {
    removeAllGreens(childItem.key, childItem);
    });
  };
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
    //expandedKeys.push(27);
   // expandedKeys.push(26);
    this.setState({
      expandedKeys,
      autoExpandParent: true
    });
  };

  retrieveNodes = searchKeyword => {
    return dataList.filter(
      item => item && item.title.indexOf(searchKeyword) !== -1
    );
  };

  retrieveNodesByKey = key => {
    return dataList.filter(
      item => item && item.key === key
    );
  };

  onChange = e => {
    const { value } = e.target;

    // Getting back list of matched nodes by keyword in Search
    this.getAllParents(value);

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

      allParents = [];
      this.getAllParentsByKey(parentKey);

      let anyParentGreen = false;

      console.log("****** SEARCHED PARENTS ARE :" , allParents);

      if (allParents && allParents.length !== 0) {
        allParents.forEach(item => {
          if ($("#" + item).hasClass("pin-search")) {
            anyParentGreen = true;
          }
        });
      }

      allParents = [];

      if (!anyParentGreen) {
        let rootData =[...this.state.treeData];
        selectTreeNode(targetKey, rootData[0]);

        removeAllGreens(targetKey, selectedTree);
      }

      // check active pin children
      selectedTree = null;
      let rootData = [...this.state.treeData];
      selectTreeNode(targetKey, rootData[0] );
      childrensWithActivePin = [];
      getAllPinnedChildren(targetKey, selectedTree, targetKey);

      childrensWithActivePin.forEach(item => {
 
        selectedTree = null;
        let rootData = [...this.state.treeData];
        selectTreeNode(item, rootData[0]);

  

        setDefaultExpandsByIteratingTree(item, selectedTree);
      });

      // remove default expands 


      this.setState(
        {
          changed: true
        },
        () => {
     
        }
      );

      //
    } else {
 

      selectedTree = null;
      let rootData = [...this.state.treeData];
      selectTreeNode(targetKey, rootData[0]);


      console.log(">>> Selected tree is ", selectedTree);
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
        if (item.subcategories) {
          return loop(item.subcategories, key, callback);
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
        item.subcategories = item.subcategories || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.subcategories.push(dragObj);
      });
    } else if (
      (info.node.props.subcategories || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.subcategories = item.subcategories || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.subcategories.unshift(dragObj);
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


  getAllParentsByKey(key) {
    const keyTargets = this.retrieveNodesByKey(key);
    searchedParents = [];
    keyTargets.map(item => {
      getParentsByKeyList(item.key, dataList);
    });
  }

 

  render() {

    let allGreensString = localStorage.getItem("allGreens");
    let greens = [];
    if (allGreensString) {
      greens = JSON.parse(allGreensString);

    }

    let pinnedItemsString = localStorage.getItem("pinnedItems");
    let pinnedItems = [];
    if (pinnedItemsString) {
      pinnedItems = JSON.parse(pinnedItemsString);
 
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
        if (item.subcategories && item.subcategories.length !== 0
            ) {
          return {
            title,
            key: item.key,
            parentKey: item.parentKey,
            children: loop(item.subcategories)
          };
        } else if(item.subcategories &&  item.itemStoreAllDto && item.itemStoreAllDto.length !== 0){
            return{
                title,
                key: item.key,
                parentKey: item.parentKey,
                children: loop(item.itemStoreAllDto)
            }
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
    //le

   //let allExpands = expands;

   // console.log(">>>> All expands", allExpands);
    console.log(">>>>> tree data inside render: ", this.state.treeData);

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
          defaultExpandedKeys={allExpands}
          autoExpandParent={this.autoExpandParent}
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
