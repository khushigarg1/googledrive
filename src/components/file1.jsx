// // import React, { useState, useEffect } from "react";
// // import axios from "axios";

// // const API_URL = 'http://15.206.70.134:8006';

// // function FileManager() {
// //     const [location, setLocation] = useState("/");
// //     const [folders, setFolders] = useState([]);
// //     const [newFolderName, setNewFolderName] = useState([]);

// //     useEffect(() => {
// //         fetchFolders(location);
// //     }, [location]);

// //     const createFolder = async (name) => {
// //         try {
// //             const response = await axios.post("http://15.206.70.134:8006/folder", {
// //                 name,
// //                 location,
// //             });
// //             console.log("ads")
// //             console.log(response.data)
// //             setLocation(`${location}/${name}`);
// //         } catch (error) {
// //             console.log("error")
// //             console.error(error);
// //         }
// //     };

// //     const fetchFolders = async (location) => {
// //         try {
// //             console.log(location);
// //             const response = await axios.get(`${API_URL}/folder?location=${location}`);
// //             console.log(response.data);
// //             setFolders(response.data);
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     };

// //     // const fetchFolders = async (location) => {

// //     //     fetch(`${API_URL}/folder`, {
// //     //         method: "GET",
// //     //         headers: {
// //     //             "Content-Type": "application/json"
// //     //         },
// //     //         params: {
// //     //             location: JSON.stringify(location),
// //     //         }
// //     //     })
// //     //         .then(response => response.json())
// //     //         .then(data => console.log(data))
// //     //         .catch(error => console.error(error));
// //     // };


// //     // const renameFolder = async (oldName, newName) => {
// //     //     try {
// //     //         const response = await axios.patch(`${API_URL}/folder/${encodeURIComponent(oldName)}`, {
// //     //             name: newName,
// //     //             location,
// //     //         });
// //     //         console.log(response.data);
// //     //         fetchFolders(location);
// //     //     } catch (error) {
// //     //         console.error(error);
// //     //     }
// //     // };

// //     // const deleteFolder = async (folderName) => {
// //     //     try {
// //     //         const response = await axios.delete(`${API_URL}/folder/${encodeURIComponent(folderName)}`);
// //     //         console.log(response.data);
// //     //         fetchFolders(location);
// //     //     } catch (error) {
// //     //         console.error(error);
// //     //     }
// //     // };

// //     const handleClickFolder = (folderName) => {
// //         // setLocation(`${location}/${folderName}`);
// //         const newLocation = location === '/' ? `/${folderName}` : `${location}/${folderName}`;
// //         setLocation(newLocation);
// //     };

// //     return (
// //         <div>
// //             <h1>Current location: {location}</h1>
// //             <ul>
// //                 {folders.map((folder) => (
// //                     <li key={folder.id} onClick={() => handleClickFolder(folder.name)}>
// //                         {folder.name}
// //                     </li>
// //                 ))}
// //             </ul>
// //             <input
// //                 type="text"
// //                 placeholder="New folder name"
// //                 onChange={(e) => setNewFolderName(e.target.value)}
// //             />
// //             <button onClick={() => createFolder(newFolderName)}>Create folder</button>
// //         </div>
// //     );
// // };

// // export default FileManager;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = 'http://15.206.70.134:8006';

// function FileManager() {
//     const [location, setLocation] = useState("/");
//     const [folders, setFolders] = useState([]);
//     const [files, setFiles] = useState([]);
//     const [newFolderName, setNewFolderName] = useState("");
//     const [renameFolderName, setRenameFolderName] = useState("");
//     const [renameFileName, setRenameFileName] = useState("");
//     const [deleteFolderName, setDeleteFolderName] = useState("");
//     const [deleteFileName, setDeleteFileName] = useState("");
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [uploadFileError, setUploadFileError] = useState(null);

//     useEffect(() => {
//         fetchFolders(location);
//         fetchFiles(location);
//     }, [location]);

//     const fetchFolders = async (location) => {
//         try {
//             const response = await axios.get(`${API_URL}/folder?location=${(location)}`);
//             setFolders(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const fetchFiles = async (location) => {
//         try {
//             const response = await axios.get(`${API_URL}/file?location=${(location)}`);
//             setFiles(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const createFolder = async (name) => {
//         try {
//             await axios.post(`${API_URL}/folder`, {
//                 name,
//                 location,
//             });
//             setLocation(`${location}/${name}`);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const renameFolder = async (oldName, newName) => {
//         try {
//             await axios.patch(`${API_URL}/folder/${encodeURIComponent(oldName)}`, {
//                 name: newName,
//                 location,
//             });
//             fetchFolders(location);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const deleteFolder = async (folderName) => {
//         try {
//             await axios.delete(`${API_URL}/folder/${encodeURIComponent(folderName)}`);
//             fetchFolders(location);
//             fetchFiles(location);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleCreateFolder = () => {
//         if (newFolderName) {
//             createFolder(newFolderName);
//             setNewFolderName("");
//         }
//     };

//     const handleRenameFolder = () => {
//         if (renameFolderName && deleteFolderName !== renameFolderName) {
//             renameFolder(deleteFolderName, renameFolderName);
//             setRenameFolderName("");
//             setDeleteFolderName("");
//         }
//     };

//     const handleDeleteFolder = () => {
//         if (deleteFolderName) {
//             deleteFolder(deleteFolderName);
//             setDeleteFolderName("");
//         }
//     };

//     const handleSelectFile = (e) => {
//         setSelectedFile(e.target.files[0]);
//     };

//     const handleUploadFile = async () => {
//         if (selectedFile) {
//             try {
//                 const formData = new FormData();
//                 formData.append("file", selectedFile);

//                 try {
//                     await axios.post(`${API_URL}/file`, formData, {
//                         headers: {
//                             "Content-Type": "multipart/form-data",
//                         },
//                         params: {
//                             location,
//                         },
//                     });
//                     fetchFiles(location);
//                     setSelectedFile(null);
//                     setUploadFileError(null);
//                 } catch (error) {
//                     console.error(error);
//                     setUploadFileError("Failed to upload file");
//                 }
//             } catch (error) {
//                 console.error(error);
//                 setUploadFileError("Failed to upload file");
//             }
//         }
//     }
//     const handleRenameFile = () => {
//         if (renameFileName && deleteFileName !== renameFileName) {
//             try {
//                 axios.patch(`${API_URL}/file/${encodeURIComponent(deleteFileName)}`, {
//                     name: renameFileName,
//                     location,
//                 });
//                 fetchFiles(location);
//                 setRenameFileName("");
//                 setDeleteFileName("");
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     };

//     const handleDeleteFile = () => {
//         if (deleteFileName) {
//             try {
//                 axios.delete(`${API_URL}/file/${encodeURIComponent(deleteFileName)}`, {
//                     params: {
//                         location,
//                     },
//                 });
//                 fetchFiles(location);
//                 setDeleteFileName("");
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <button onClick={() => setLocation("/")}>Home</button>
//                 <button onClick={() => setLocation(location.split("/").slice(0, -1).join("/") || "/")}>Up</button>
//             </div>
//             <div>
//                 <label htmlFor="folderName">New Folder Name:</label>
//                 <input type="text" id="folderName" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
//                 <button onClick={handleCreateFolder}>Create Folder</button>
//             </div>
//             <div>
//                 <label htmlFor="renameFolderName">Rename Folder:</label>
//                 <select id="renameFolderName" value={deleteFolderName} onChange={(e) => setDeleteFolderName(e.target.value)}>
//                     <option value="">Select Folder</option>
//                     {folders.map && folders.map((folder) => (
//                         <option key={folder} value={folder}>
//                             {folder}
//                         </option>
//                     ))}
//                 </select>
//                 <input type="text" value={renameFolderName} onChange={(e) => setRenameFolderName(e.target.value)} />
//                 <button onClick={handleRenameFolder}>Rename</button>
//             </div>
//             <div>
//                 <label htmlFor="deleteFolderName">Delete Folder:</label>
//                 <select id="deleteFolderName" value={deleteFolderName} onChange={(e) => setDeleteFolderName(e.target.value)}>
//                     <option value="">Select Folder</option>
//                     {folders.map && folders.map((folder) => (
//                         <option key={folder} value={folder}>
//                             {folder}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={handleDeleteFolder}>Delete</button>
//             </div>
//             <div>
//                 <label htmlFor="file">Select file to upload:</label>
//                 <input type="file" id="file" onChange={handleSelectFile} />
//                 <button onClick={handleUploadFile}>Upload</button>
//                 {uploadFileError && <p>{uploadFileError}</p>}
//             </div>
//             <div>
//                 <label htmlFor="renameFileName">Rename File:</label>
//                 <select id="renameFileName" value={deleteFileName} onChange={(e) => setDeleteFileName(e.target.value)}>
//                     <option value="">Select File</option>
//                     {files.map((file) => (
//                         <option key={file} value={file}>
//                             {file}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={handleDeleteFile}>Delete</button>
//             </div>
//             <div>
//                 <h2>Files in {location}</h2>
//                 {files.length === 0 && <p>No files found</p>}
//                 <ul>
//                     {files.map((file) => (
//                         <li key={file}>
//                             <a href={`${API_URL}/file/${encodeURIComponent(file)}?location=${encodeURIComponent(location)}`}>
//                                 {file}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default FileManager;



// {/* </select>
//             <input type="text" value={renameFileName} onChange={(e) => setRenameFileName(e.target.value)} />
//             <button onClick={handleRenameFile}>Rename</button>
//         </div>
//                         <div>
//                             <label htmlFor="deleteFileName">Delete File:</label>
//                             <select id="deleteFileName" value={deleteFileName} onChange={(e) => setDeleteFileName(e.target.value)}>
//                                 <option value="">Select File</option>
//                                 {files.map((file) => (
//                                     <option key={file} value={file}>
//                                         {file} */}


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./file.css"
const API_URL = 'http://15.206.70.134:8006';

function FileManager() {
    // const [location, setLocation] = useState("/");
    // const [folders, setFolders] = useState([]);
    // const [newFolderName, setNewFolderName] = useState("");
    const [location, setLocation] = useState("/");
    const [folders, setFolders] = useState([]);
    const [name, setName] = useState("");
    const [files, setFiles] = useState([]);
    const [newFolderName, setNewFolderName] = useState("");
    // const [renameFolderName, setRenameFolderName] = useState("");
    const [renameFolderName, setRenameFolderName] = useState({ oldName: '', newName: '' });
    // const [renameFileName, setRenameFileName] = useState("");
    const [renameFileName, setRenameFileName] = useState({ oldName: '', newName: '' });
    const [deleteFolderName, setDeleteFolderName] = useState("");
    const [deleteFileName, setDeleteFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadFileError, setUploadFileError] = useState(null);
    const [breadcrumb, setBreadcrumb] = useState("/");
    const [visiblefile, setVisiblefile] = useState(false);
    const [currentFolder, setCurrentFolder] = useState("");

    const [showrenamefile, setshowRenamefile] = useState(false)
    const [showrenameFolder, setshowRenamefolder] = useState(false)
    const [showremovefile, setshowRemovefile] = useState(false)
    const [showremoveFolder, setshowRemovefolder] = useState(false)
    const [showcreatefile, setshowCreatefile] = useState(false)
    const [showcreatefolder, setshowCreatefolder] = useState(false)

    // const handleClick = () => {
    //     // Get the parent folder or root directory based on the current location
    //     // const parentLocation = location.split('/').slice(0, -1).join('/');
    //     const parentLocation = location.split('/')
    //     console.log(parentLocation.slice(1, -3), "sliced parentloc")
    //     let redirectLocation = "/" + parentLocation.slice(1, -3).join("/")
    //     let fname = parentLocation[parentLocation.length - 3]
    //     // const redirectLocation = parentLocation || '/';

    //     const bread = breadcrumb.split('/')
    //     console.log(bread.slice(1, -3), "sliced parentloc")
    //     let breadredirect = "/" + bread.slice(1, -3).join("/")
    //     // const redirectLocation = parentLocation || '/';

    //     // console.log(redirectLocation, "redirect")
    //     // console.log(fname, "fname")
    //     // console.log(breadredirect, "breadcrumb")

    //     setLocation(redirectLocation + (fname === "" ? "" : fname + "") + "/")
    //     // setBreadcrumb(breadredirect)
    //     redirectLocation = `${redirectLocation}/`
    //     console.log(name, location);
    //     setCurrentFolder(fname)
    //     fetchFolders(fname, redirectLocation);
    // };

    const handleClick = () => {
        const parentLocation = location.split('/')
        console.log(parentLocation.slice(1, -3), "sliced parentloc")
        // let redirectLocation = "/" + parentLocation.slice(1, -3).join("/")
        let fname = parentLocation[parentLocation.length - 3]
        const locationParts = location.split('/');
        // Remove the last directory from the location
        locationParts.splice(-2, 1);
        const newLocation = locationParts.join('/');

        // const breadcrumbparts = breadcrumb.split('/');
        // // Remove the last directory from the location
        // breadcrumbparts.splice(-2, 1);
        // const newbreadcrumb = breadcrumbparts.join('/');
        // Check if the new location is the root directory
        if (newLocation === '/') {
            // Disable the button if the current location is the root directory
            return;
        }
        // setLocation(newLocation)
        // fetchFolders(fname, newLocation)



        // Update the location and fetch the new folder contents
        // setLocation(newLocation);
        // // setLocation(newbreadcrumb);
        // console.log("newlocation", newLocation);
        // console.log("newfoldername", fname);
        // console.log("newbreadcrumb", breadcrumb);
        // setCurrentFolder(locationParts[locationParts.length - 2]);
        // fetchFolders(fname, breadcrumb);
        // fetchFolders(locationParts[locationParts.length - 2], newLocation);
    };


    useEffect(() => {
        console.log(name, location);
        fetchFolders(name, breadcrumb);
    }, [location]);


    const fetchFolders = async (name, location) => {
        console.log("fetchfolders", name, location);
        try {
            // console.log("heyy");
            const response = await axios.get(`${API_URL}/folder?location=${location}&name=${name}`);
            // const response = await axios.get(`http://15.206.70.134:8006/folder?location=/`);
            console.log(response.data);
            setFolders(response.data.folders || []);
            setFiles(response.data.files || []);
            console.log("foldersss", folders)
            console.log("filess", files)
            console.log("location", location, name)

        } catch (error) {
            console.error(error);
        }
    };


    const createFolder = async (namee, location) => {
        console.log(location);
        try {
            const response = await axios.post(`${API_URL}/folder?location=${location}`, {
                name: namee,
                location: location,
            });
            console.log(response.data)
            console.log("location", location)
            console.log("breadcrumbb", breadcrumb)
            // setBreadcrumb(location)
            // console.log("namesoffolder", newFolderName);
            // console.log("namesof", name);
            fetchFolders(name, breadcrumb)
            // setLocation(`${location}/${name}`);

        } catch (error) {
            console.error(error);
        }
    };

    const renameFolder = async (location) => {
        try {
            await axios.patch(`${API_URL}/folder`, {
                oldName: renameFolderName.oldName,
                newName: renameFolderName.newName,
                location: location,
            });
            setName(renameFolderName.newName)
            fetchFolders(name, location);
        } catch (error) {
            console.error(error);
        }
    };

    // const handleRenameFolder = () => {
    //     if (renameFolderName && deleteFolderName !== renameFolderName) {
    //         renameFolder(deleteFolderName, renameFolderName);
    //         setRenameFolderName("");
    //         setDeleteFolderName("");
    //     }
    // };

    const handleClickFolder = (folderName) => {
        setCurrentFolder(folderName)
        setVisiblefile(false)
        setName(folderName)
        // console.log("location1", location);
        console.log("breadcrumbcreate", breadcrumb);
        console.log("namecreate", name);
        console.log("createlocation", location);
        setBreadcrumb(location)
        fetchFolders(name, breadcrumb)
        // setLocation(location)
        const newLocation = location === '/' ? `/${folderName}/` : `${location}${folderName}/`;
        setLocation(newLocation);
        console.log("location:--", location);
        // console.log(name, location);
        // fetchFolders(name, location)
    };


    const handleClickFile = async (name, location) => {
        // const response = await fetch(`https://api.example.com/files/${fileName}`);
        setVisiblefile(true)
        console.log("loc", location);
        // const response = await axios.get(`${API_URL}/file?location=${location}&name=${name}`);
        const newLocation = currentFolder === "" ? `/` : `${location}${currentFolder}/`;

        const response = await axios.get(`${API_URL}/file?location=${newLocation}&name=${name}`);

        console.log("data", response.data);
        console.log("content", response.data.content);
        let content = await response.data.content;
        // console.log("content", content);
        // content = string(content)
        const data = {
            "content": content,
            "name": name
        }
        // const display = "<p>${content}</p"
        // Display content in a modal
        // const modal = document.createElement("div");
        const modal = document.getElementById("file-text-content")
        const modal2 = document.getElementById("filename")
        // modal.classList.add("modal");
        // modal.innerHTML = display;
        modal.innerHTML = `${data.content}`;
        modal2.innerHTML = `${data.name}`;
        //     <h2>${name}</h2>
        //     <pre>${content}</pre>
        // `;
        // document.body.appendChild(modal);
    };

    const fileopen = () => {
        return (<div>
            <h1 id="filename"></h1>
            <div className="fileopen" id="file-text-content">


            </div>
        </div >
        );
    }


    const handleSelectFile = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (file, location) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");

        const formData = new FormData();
        // formData.append("file", file);
        formData.append("name", file.name);
        // formData.append("location", location);
        console.log("creatfiledata", name, location);

        fileReader.onload = async (evt) => {
            const fileContent = evt.target.result;
            console.log("filecontent", fileContent);
            try {
                const response = await axios.post(`${API_URL}/file`, {
                    name: file.name,
                    location: location,
                    content: fileContent
                    // headers: {
                    //     "Content-Type": "multipart/form-data"
                    // }
                });
                console.log(response.data);
                fetchFolders(name, breadcrumb)
            } catch (error) {
                console.error(error);
            }
        };
    };

    const handleRenameFile = (location) => {
        try {
            console.log("ada", renameFileName.oldName, renameFileName.newName, location)
            axios.put(`${API_URL}/file`, {
                oldName: renameFileName.oldName,
                newName: renameFileName.newName,
                // newName: renameFileName.newName,
                location: location,
            });
            console.log("name", name);
            console.log("breadcrumb", breadcrumb);
            fetchFolders(name, breadcrumb)
            setRenameFileName("");
            // setDeleteFileName("");
        } catch (error) {
            console.error(error);
        }
    };

    // const handleRenameFolder = (location) => {
    //     try {
    //         console.log("ada", renameFileName.oldName, renameFileName.newName, location)
    //         axios.put(`${API_URL}/file`, {
    //             oldName: renameFileName.oldName,
    //             newName: renameFileName.newName,
    //             // newName: renameFileName.newName,
    //             location: location,
    //         });
    //         console.log("name", name);
    //         console.log("breadcrumb", breadcrumb);
    //         fetchFolders(name, breadcrumb)
    //         setRenameFileName("");
    //         // setDeleteFileName("");
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const handleDeleteFile = (deleteFileName, location) => {
        // if (deleteFileName) {
        console.log("ada", deleteFileName, location)
        try {
            axios.delete(`${API_URL}/file`, {
                data: {
                    location: location,
                    name: deleteFileName
                },
            });
            console.log("name", name);
            console.log("breadcrumb", breadcrumb);
            fetchFolders(name, breadcrumb)
            // setDeleteFileName("");
        } catch (error) {
            console.error(error);
        }
        // }
    };

    const handleDeleteFolder = (deleteFolderName, location) => {
        // if (deleteFileName) {
        console.log("deletefolderdetails", deleteFolderName, location)
        try {
            axios.delete(`${API_URL}/folder`, {
                data: {
                    location: location,
                    name: deleteFolderName
                },
            });
            console.log("name", name);
            console.log("breadcrumb", breadcrumb);
            fetchFolders(name, breadcrumb)
            // setDeleteFileName("");
        } catch (error) {
            console.error(error);
        }
        // }
    };


    return (
        <div className="file-explorer">
            <div className="breadcrumb">
                {/* <p>Location: {location}</p> */}
                <p>Location: /drive{location}</p>
            </div>
            <button className="backbtn" onClick={handleClick}>..</button>

            <h1 className="section-heading">Folders and Files</h1>
            <div className="folders-files" id="files-and-folder">
                <ul className="folders-list">
                    {folders.map((folder) => (
                        <li className="folder-item" key={folder.id} onClick={() => handleClickFolder(folder.name)}>
                            {folder.name}
                        </li>
                    ))}
                </ul>

                <ul className="folders-list">
                    {files.map((file) => (
                        <li className="folder-item" key={file.id} onClick={() => handleClickFile(file.name, breadcrumb)} >
                            {file.name}
                        </li>
                    ))}
                </ul>
            </div>

            {visiblefile ? fileopen() : null}

            <h1 className="section-heading">Folder Options</h1>
            <div className="folder-options" id="folder-options">

                <button className="create-folder-button" onClick={() => setshowCreatefolder(!showcreatefolder)}>Create Folder</button>
                {(showcreatefolder &&
                    <div id="folder-create-panel">
                        <li className="label-input">
                            <label className="old-name-label">enter file name:</label>
                            <input type="text" className="new-name-input" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} />
                        </li>
                        <button className="create-folder-button, btn" onClick={() => createFolder(newFolderName, location)}>Create</button>
                    </div>
                )}
                {/* <div className="rename-folder-section"> */}
                <button className="rename-button" onClick={() => setshowRenamefolder(!showrenameFolder)}>Rename Folder</button>
                {(showrenameFolder &&
                    <div id="folder-rename-panel">
                        <div className="rename-folder-inputs">
                            <label className="old-name-label">Old Name:</label>
                            <input type="text" className="old-name-input" value={renameFolderName.oldName} onChange={(e) => setRenameFolderName({ ...renameFolderName, oldName: e.target.value })} />
                        </div>
                        <div className="rename-folder-inputs">
                            <label className="new-name-label">New Name:</label>
                            <input type="text" className="new-name-input" value={renameFolderName.newName} onChange={(e) => setRenameFolderName({ ...renameFileName, newName: e.target.value })} />
                        </div>
                        <button className="rename-folder-button, btn" onClick={() => renameFolder(location)}>Rename </button>
                    </div>
                )}

                <button className="remove-button" onClick={() => setshowRemovefolder(!showremoveFolder)}>Remove Folder</button>
                {(showremoveFolder &&
                    <div id="folder-remove-panel">
                        <div className="label-input">
                            <label className="old-name-label">File name:</label>
                            <input type="text" className="new-name-input" value={deleteFolderName} onChange={(e) => setDeleteFolderName(e.target.value)} />
                        </div>
                        <button className="remove-button, btn" onClick={() => handleDeleteFolder(deleteFolderName, location)}>Remove </button>
                    </div>
                )}
                {/* </div> */}
            </div>

            <h1 className="section-heading">File Options</h1>
            <div className="file-options">

                <button className="remove-button" onClick={() => setshowCreatefile(!showcreatefile)}>Create File</button>
                {(showcreatefile &&
                    <div id="file-upload-panel">
                        <div className="file-section">
                            <label htmlFor="file">Select file to upload:</label>
                            <input type="file" className="file-input" onChange={handleSelectFile} />
                            {uploadFileError && <p>{uploadFileError}</p>}
                        </div>
                        <button className="remove-button, btn" onClick={() => handleFileUpload(selectedFile, location)}>Create</button>
                    </div>
                )}

                {/* <div className="rename-file-section"> */}
                <button className="remove-button" onClick={() => setshowRenamefile(!showrenamefile)}>Rename File</button>
                {showrenamefile && (
                    <div id="file-rename-panel">
                        <div className="rename-file-inputs">
                            <label className="old-name-label">Old Name:</label>
                            <input type="text" className="old-name-input" value={renameFileName.oldName} onChange={(e) => setRenameFileName({ ...renameFileName, oldName: e.target.value })} />
                        </div>
                        <div className="rename-file-inputs">
                            <label className="old-name-label">New Name:</label>
                            <input type="text" className="old-name-input" value={renameFileName.newName} onChange={(e) => setRenameFileName({ ...renameFileName, newName: e.target.value })} />
                        </div>
                        <button className="rename-file-button, btn" onClick={() => handleRenameFile(location)}>rename</button>
                    </div>
                )}
                <button className="remove-button" onClick={() => setshowRemovefile(!showremovefile)}>Remove File</button>
                {(showremovefile &&
                    < div id="file-remove-panel" >
                        <div className="rename-file-inputs">
                            <label className="old-name-label">File name:</label>
                            <input type="text" className="deltefile" value={deleteFileName} onChange={(e) => setDeleteFileName(e.target.value)} />
                        </div>
                        <button className="remove-button, btn" onClick={() => handleDeleteFile(deleteFileName, location)}>Remove</button>
                    </div>
                )}
                {/* </div> */}
            </div>
        </div >
    );
};

export default FileManager;