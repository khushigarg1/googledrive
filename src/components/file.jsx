import React, { useState, useEffect } from "react";
import axios from "axios";
import "./file.css"
import fileimg from "./file.png";
import folderimg from "./folder.png";

const API_URL = 'https://www.gdrive.vasaniyakush.tech';
// const API_URL = 'www.gdrive.vasaniyakush.tech';
// const API_URL = 'http://15.206.70.134:8006';

function FileManager() {
    // const [location, setLocation] = useState("/");
    // const [folders, setFolders] = useState([]);
    // const [newFolderName, setNewFolderName] = useState("");
    const [location, setLocation] = useState("/");    //set location at top 
    const [breadcrumb, setBreadcrumb] = useState("/");  //which is used to set location when we are creating new folder and sending this location to api
    const [folders, setFolders] = useState([]);         //set fodlers name according to location
    const [name, setName] = useState("");               //current folder name
    const [files, setFiles] = useState([]);             //set file name accoridng to location
    const [newFolderName, setNewFolderName] = useState("");     //creating new fodler 
    // const [renameFolderName, setRenameFolderName] = useState("");
    const [renameFolderName, setRenameFolderName] = useState({ oldName: '', newName: '' });     //after renaming a fodler which stores oldname and newname
    // const [renameFileName, setRenameFileName] = useState("");
    const [renameFileName, setRenameFileName] = useState({ oldName: '', newName: '' });         //afetr renaming a file which stores oldname and newname
    const [deleteFolderName, setDeleteFolderName] = useState("");       //fodlername which we want to delete
    const [deleteFileName, setDeleteFileName] = useState("");           //filename which we want to delete
    const [selectedFile, setSelectedFile] = useState(null);             //when we are uploading a file 
    const [visiblefile, setVisiblefile] = useState(false);              //whenw e click on file it should be visible 
    const [currentFolder, setCurrentFolder] = useState("");             //currenfolder

    const [showrenamefile, setshowRenamefile] = useState(false)         //click on rename file a div will be visible
    const [showrenameFolder, setshowRenamefolder] = useState(false)
    const [showremovefile, setshowRemovefile] = useState(false)
    const [showremoveFolder, setshowRemovefolder] = useState(false)
    const [showcreatefile, setshowCreatefile] = useState(false)
    const [showcreatefolder, setshowCreatefolder] = useState(false)

    const handleClick = () => {
        // Get the parent folder or root directory based on the current location
        // let locationset = location.split('/').slice(0, -1).join('/');
        if (location == "/") {
            return;
        }
        let parentLocation = location.split('/')
        console.log(parentLocation, "parentlocation");
        // console.log(parentLocation.slice(1, -3), "sliced parentloc")
        // let redirectLocation = "/" + parentLocation.slice(1, -3).join("/")
        let fname = parentLocation[parentLocation.length - 3]
        console.log(fname, "fname")
        // const redirectLocation = parentLocation || '/';

        // let locationset = parentLocation.slice(0, -2).join("/")
        let locationset = breadcrumb
        console.log(locationset, " locationset");
        // /a/b/c/d/f/ -- location
        // /a/b/c/d/  -- breakcrumb | f - foldername -- current
        // after back

        const parentbreadcrumb = breadcrumb.split('/')
        console.log(parentbreadcrumb, " breadcrumb")
        console.log(parentbreadcrumb.slice(0, -2), " sliced breadcrumb")
        let redirectLocation = parentbreadcrumb.slice(0, -2).join("/")
        // "" / folder1 / a / a / ab / acvd / ""
        // location: "" / folder1 / a / a / ab /
        //     breadcrumb: "" / folder1 / a / a /


        console.log(redirectLocation, " redirect")
        // console.log(breadredirect, "breadcrumb")

        setLocation(locationset)
        setBreadcrumb(redirectLocation + "/")
        // setLocation(locationset + "/")
        // setBreadcrumb(redirectLocation + (fname === "" ? "" : fname + "/"))
        // setBreadcrumb(breadredirect)
        setName(fname)
        // redirectLocation = `${redirectLocation}`
        // redirectLocation = `${redirectLocation}/`
        console.log(name, location);
        fetchFolders(fname, redirectLocation + "/");
    };


    useEffect(() => {
        console.log(name, location);
        fetchFolders(name, breadcrumb);
    }, [location]);

    //   ---------------------------------------------------------TO FETCH FOLDER------------------------------------------- 
    const fetchFolders = (name, breadcrumb) => {
        return new Promise((resolve, reject) => {
            // console.log("heyy");
            // console.log("fetchfolders", name, location);
            axios.get(`${API_URL}/folder/?location=${breadcrumb}&name=${name}`)
                // axios.get(`https://www.gdrive.vasaniyakush.tech/folder/?location=/&name=folder1`)
                .then(response => {
                    // console.log(response.data);
                    setFolders(response.data.folders || []);
                    setFiles(response.data.files || []);
                    // console.log("foldersss", folders)
                    // console.log("filess", files)
                    // console.log("location", location, name)
                    resolve();
                })
                .catch(error => {
                    // console.error(error);
                    reject(error);
                });
        });
    };

    //   ---------------------------------------------------------TO CREATE A FOLDER------------------------------------------- 
    const createFolder = (namee, location) => {
        return new Promise((resolve, reject) => {
            // console.log(location);
            axios.post(`${API_URL}/folder/?location=${location}`, {
                name: namee,
                location: location,
            })
                .then(response => {
                    // console.log(response.data)
                    // console.log("location", location)
                    // console.log("breadcrumbb", breadcrumb)
                    // setBreadcrumb(location)
                    // console.log("namesoffolder", newFolderName);
                    // console.log("namesof", name);
                    fetchFolders(name, breadcrumb)
                    resolve();
                })
                .catch(error => {
                    alert("Failed to create a folder");
                    console.error(error);
                    reject(error);
                });
        });
    };

    //   ---------------------------------------------------------TO RENAME A FOLDER------------------------------------------- 
    const handlerenameFolder = async (location) => {
        try {
            // console.log("ada", renameFileName.oldName, renameFileName.newName, location)
            await axios.put(`${API_URL}/folder/`, {
                oldName: renameFolderName.oldName,
                newName: renameFolderName.newName,
                location: location,
            });
            // console.log("name", name);
            // console.log("breadcrumb", breadcrumb);
            await fetchFolders(name, breadcrumb)
            setRenameFileName("");
        } catch (error) {
            alert("Failed to rename the folder");
            console.error(error);
        }
    };

    //   ---------------------------------------------------------TO DELTE A FOLDER------------------------------------------- 
    const handleDeleteFolder = async (deleteFolderName, location) => {
        try {
            await axios.delete(`${API_URL}/folder/`, {
                data: {
                    location: location,
                    name: deleteFolderName
                },
            });
            // console.log("name", name);
            // console.log("breadcrumb", breadcrumb);
            await fetchFolders(name, breadcrumb);
            // setDeleteFolderName("");
        } catch (error) {
            alert("Failed to remove the folder");
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


    //   ---------------------------------------------------------WHEN WE CLICK ON FOLDER------------------------------------------- 
    const handleClickFolder = (folderName) => {
        // setCurrentFolder(folderName);
        setVisiblefile(false);
        setName(folderName);
        // console.log("location1", location);
        Promise.all([fetchFolders(name, breadcrumb)])
            .then((results) => {
                setBreadcrumb(location);
                const newLocation = location === '/' ? `/${folderName}/` : `${location}${folderName}/`;
                setLocation(newLocation);
                // console.log("breadcrumbcreate", breadcrumb);
                // console.log("namecreate", name);
                // console.log("createlocation", location);
                // console.log("location:--", location);
                // console.log(name, location);
                // console.log(name, location);
                // fetchFolders(name, location)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    //   ---------------------------------------------------------WHEN WE CLICK ON FILE------------------------------------------- 
    const handleClickFile = (name, location) => {
        return new Promise((resolve, reject) => {
            setVisiblefile(true)
            console.log("loc", location);
            // const response = await axios.get(`${API_URL}/file?location=${location}&name=${name}`);
            const newLocation = currentFolder === "" ? `/` : `${location}${currentFolder}/`;
            axios.get(`${API_URL}/file/?location=${newLocation}&name=${name}`)
                .then(response => {
                    // console.log("data", response.data);
                    // console.log("content", response.data.content);
                    let content = response.data.content;
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
                    modal.innerHTML = `${data.content}`;
                    modal2.innerHTML = `${data.name}`;
                    // document.body.appendChild(modal);
                    resolve();
                })
                .catch(error => {
                    console.error(error);
                    reject(error);
                });
        });
    };

    //   ---------------------------------------------------------WHEN WE OPEN FILE A DIV SHOULD BE SHOWN THERE------------------------------------------- 
    const fileopen = () => {
        return (<div>
            <h1 id="filename"></h1>
            <div className="fileopen" id="file-text-content">


            </div>
        </div >
        );
    }

    //   ---------------------------------------------------------HANDLING SELECTED FILE------------------------------------------- 
    const handleSelectFile = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    //   ---------------------------------------------------------TO UPLOAD A FILE------------------------------------------- 
    const handleFileUpload = (file, location) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsText(file, "UTF-8");

            const formData = new FormData();
            // formData.append("file", file);
            formData.append("name", file.name);

            // console.log("creatfiledata", name, location);
            fileReader.onload = (evt) => {
                const fileContent = evt.target.result;
                // console.log("filecontent", fileContent);

                axios.post(`${API_URL}/file/`, {
                    name: file.name,
                    location: location,
                    content: fileContent
                })
                    .then(response => {
                        console.log(response.data);
                        fetchFolders(name, breadcrumb)
                        resolve();
                    })
                    .catch(error => {
                        alert("Failed to upload the file");
                        console.error(error);
                        reject(error);
                    });
            };
        });
    };

    //   ---------------------------------------------------------TO RENAME A FILE------------------------------------------- 
    const handleRenameFile = async (location) => {
        try {
            // console.log("ada", renameFileName.oldName, renameFileName.newName, location)
            await axios.put(`${API_URL}/file/`, {
                oldName: renameFileName.oldName,
                newName: renameFileName.newName,
                location: location,
            });
            // console.log("name", name);
            // console.log("breadcrumb", breadcrumb);
            await fetchFolders(name, breadcrumb)
            setRenameFileName("");
        } catch (error) {
            alert("Failed to rename the file");
            console.error(error);
        }
    };

    //   ---------------------------------------------------------TO DELTE A FILE------------------------------------------- 
    // const handleDeleteFile = (deleteFileName, location) => {
    const handleDeleteFile = async (deleteFileName, location) => {
        try {
            console.log("ada", deleteFileName, location);
            await axios.delete(`${API_URL}/file/`, {
                data: {
                    location: location,
                    name: deleteFileName,
                },
            });
            // console.log("name", name);
            // console.log("breadcrumb", breadcrumb);
            await fetchFolders(name, breadcrumb);
        } catch (error) {
            alert("Failed to remove the file");
            console.error(error);
        }
    };



    return (
        <div className="file-explorer">
            <div className="breadcrumb">
                {/* <p>Location: {location}</p> */}
                <p>Location: drive{location}</p>
            </div>
            <button className="backbtn" onClick={handleClick}>..</button>

            {/* ---------------------------------FOLDER AND FILES------------------------------ */}
            <h1 className="section-heading">Folders and Files</h1>
            <div className="folders-files" id="files-and-folder">
                <ul className="folders-list">
                    {folders.map((folder) => (
                        <li className="folder-item" key={folder.id} onClick={() => handleClickFolder(folder.name)}>
                            <img src={folderimg} alt="Folder icon" className="folder-icon" />
                            {folder.name}
                        </li>
                    ))}
                </ul>

                <ul className="folders-list">
                    {files.map((file) => (
                        <li className="folder-item" key={file.id} onClick={() => handleClickFile(file.name, breadcrumb)} >
                            <img src={fileimg} alt="Folder icon" className="folder-icon" />
                            {file.name}
                        </li>
                    ))}
                </ul>
            </div>

            {visiblefile ? fileopen() : null}

            {/* ---------------------------------FOLDER OPTIONS------------------------------ */}
            <h1 className="section-heading">Folder Options</h1>
            <div className="folder-options" id="folder-options">
                {/* ---------------------------------CREATE FOLDER------------------------------ */}
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

                {/* ---------------------------------RENAME FOLDER------------------------------ */}
                {/* <div className="rename-folder-section"> */}
                <button className="rename-button" onClick={() => setshowRenamefolder(!showrenameFolder)}>Rename Folder</button>
                {(showrenameFolder &&
                    <div id="folder-rename-panel">
                        <div className="rename-folder-inputs">
                            <label className="old-name-label">Old Name:</label>
                            <input type="text" className="old-name-input" value={renameFolderName.oldName} onChange={(e) => setRenameFolderName({ ...renameFolderName, oldName: e.target.value })} />
                        </div>
                        <div className="rename-folder-inputs">
                            <label className="old-name-label">New Name:</label>
                            <input type="text" className="old-name-input" value={renameFolderName.newName} onChange={(e) => setRenameFolderName({ ...renameFolderName, newName: e.target.value })} />
                        </div>
                        <button className="rename-file-button, btn" onClick={() => handlerenameFolder(location)}>Rename </button>
                    </div>
                )}

                {/* ---------------------------------REMOVE FOLDER------------------------------ */}
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

            {/* ---------------------------------FILE OPTIONS------------------------------ */}
            <h1 className="section-heading">File Options</h1>
            <div className="file-options">

                {/* ---------------------------------UPLOAD FILE------------------------------ */}
                <button className="remove-button" onClick={() => setshowCreatefile(!showcreatefile)}>Create File</button>
                {(showcreatefile &&
                    <div id="file-upload-panel">
                        <div className="file-section">
                            <label htmlFor="file">Select file to upload:</label>
                            <input type="file" className="file-input" onChange={handleSelectFile} />
                            {/* {uploadFileError && <p>{uploadFileError}</p>} */}
                        </div>
                        <button className="remove-button, btn" onClick={() => handleFileUpload(selectedFile, location)}>Create</button>
                    </div>
                )}

                {/* ---------------------------------RENAME FILE------------------------------ */}
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

                {/* ---------------------------------REMOVE FILE------------------------------ */}
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