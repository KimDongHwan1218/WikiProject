import './Design.css';
import AWS from 'aws-sdk';
import { Row, Col, Button, Input, Alert } from 'reactstrap';
import renderfunction from "./renderfunction";
import htmltosearch from "./htmltosearch";
import { useParams } from 'react-router-dom';
import './Design.css'
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { customAxios } from "./baseurl.ts";
import { useMediaQuery } from 'react-responsive';
import * as width from "../config.js";

const S3upload=() => {
    const issmwidth = useMediaQuery({ minWidth: width.smwidth })
    const ismdwidth= useMediaQuery({ minWidth: width.mdwidth }) && issmwidth
    const islgwidth = useMediaQuery({ minWidth: width.lgwidth }) && ismdwidth
    const isxlwidth = useMediaQuery({ minWidth: width.xlwidth }) && islgwidth
    const is2xlwidth = useMediaQuery({ minWidth: width.twoxlwidth }) && isxlwidth

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const params = useParams();
    const query = params.query;
    const [data, setData] = useState(null);

    const ACCESS_KEY = 'IAM의 ACCESS KEY';
    const SECRET_ACCESS_KEY = 'IAM의 SECRET ACCESS KEY';
    const REGION = "ap-northeast-2";
    const S3_BUCKET = 'codegear-react-file-upload-test-bucket';

    AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
    });

    const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
    });

    const handleFileInput = (e) => {
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        if(file.type !== 'image/jpeg' || fileExt !=='jpg'){
            alert('jpg 파일만 Upload 가능합니다.');
            return;
        }
        setProgress(0);
        setSelectedFile(e.target.files[0]);
    }
    
    const uploadFile = (file) => {
        const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: "upload/" + file.name
        };
        
        myBucket.putObject(params)
        .on('httpUploadProgress', (evt) => {
            setProgress(Math.round((evt.loaded / evt.total) * 100))
            setShowAlert(true);
            setTimeout(() => {
            setShowAlert(false);
            setSelectedFile(null);
            }, 3000)
        })
        .send((err) => {
            if (err) console.log(err)
        })

        console.log("업로드 됐나?")
    }

    
    const onClickSubmit = async() => {
        uploadFile();
        console.log("onclick data", data)
        await axios.post('/api/edit/submit', {"title": query, "plaintext": htmltosearch(data), "data" :DivideBySlot(data)})
        .then(console.log("제출했다 씨발ㅋㅋ"))
        .then(console.log("팝업으로 ㄹㅇ? 확인하고 팝업에서 예스는 페이지 이동할거임."))
    }

    const callApi = async()=>{
        await axios.get(`/api/docs/${params.query}`)
        .then((load_data)=>{  
            const output = load_data.data;
            if(output.length>=1) {
                var new_data = ''
                for (var i of output){
                console.log("i", i.text)
                var new_data = new_data + '\n'+i.text
                console.log("new_data", new_data)
                }
                setData(new_data)
                document.getElementById('editor').innerHTML = new_data;  
            }
            else{
                setData(null);
            }
        });
    };
      // load_origin()

      
       // axios.get()
    
      const DivideBySlot = (html) => { // ===어쩌구===단위로 나누기. slot별로 나누기 위함. 
        let divided_list = []
        const re = /(\n)(?===[^=\n]+==)/g;
        const input_list = html.split(re).filter(x => x !== '\n')
        console.log("input_string", [html])
        console.log("inputlist:", input_list)
        input_list.forEach((value, index, array)=>{
            divided_list.push({"role_id": index, "text":value})
        })
        console.log("divided_list", divided_list)
        return divided_list
    }

    useEffect(()=>{
        callApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <div className={isxlwidth ? 'contents-fixed':'contents-shrink'}>
            <div className='top'>
                <Row>
                <Col><h1>File Upload</h1></Col>
                </Row>
            </div>
            <div>
                <Row>
                <Col>
                    { showAlert?
                    <Alert color="primary">업로드 진행률 : {progress}%</Alert>
                    : 
                    <Alert color="primary">파일을 선택해 주세요.</Alert> 
                    }
                </Col>
                </Row>
                <Row>
                <Col>
                    <Input color="primary" type="file" onChange={handleFileInput}/>
                    {selectedFile?(
                    <Button color="primary" onClick={() => uploadFile(selectedFile)}> Upload to S3</Button>
                    ) : null }
                </Col>
                </Row>
            </div>
        </div>
    );

  };

export default S3upload;
