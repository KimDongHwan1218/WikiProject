export default function renderfunction(input){
  if(!input) {
    console.log("no rendering input")
    return input
  }

  
  var value = removehtml(input);

  indexs, value = check_line_by_line(value)
  console.log(value)

  return (indexs, value)
};


function removehtml(output){
  output = output.replace(/</g,'&lt;');
  output = output.replace(/<\//g,'&lt;/');
  output = output.replace(/>/,'&gt;');
  return output
}

// == 문단 머릿글 ==
// ''머릿글''을 이용하여 문단을 구분해 내용을 입력할 수 있습니다. 위키 소프트웨어는 이를 이용하여 자동으로 목차를 구성하게 됩니다. 두 개의 등호 입력으로 시작됩니다.

// === 하위 문단 ===
// 등호를 더 사용하면 하위 문단이 만들어집니다.

// ==== 더 작은 하위 문단 ====
// 두 개에서 바로 네 개의 등호로 단계를 건너뛰지 마세요.

// 엔터 두번
// 글 내에서 문단을 나누기 위해서 엔터키를 두번 입력합니다.

function check_line_by_line(input){
  input = input.toString().split("\n")
  var classification = []
  var frame = []
  var output = ''
  var indexs = [] //인덱스는 첫번째 항목 맨 위에 올라가게 됨.
  input.forEach((value, index, array)=>{
    var classification, frame, index, res = check_paragraph(value) 
    indexs.append(index)
    res = check_dividingline(res)
    res = textshape(res)
    res = internal_link(res)
    output = output.concat(res,'\n')
  })
  return(indexs, output)
}

function check_classification(input){
  var classification = //g
}

function check_frame(input){
  var frame = //g
}

function check_annotation(input){
  var annotation = //g
}

function check_paragraph(input){

  var heading = /(?<=^==)([^=]+)(?===$)/g
  var paragraph = /(?<=^===)([^=]+)(?====$)/g
  var smallparagraph = /(?<=^====)([^=]+)(?=====$)/g


  if (input.match(classification)) return (input.match(classification), null, null, null)
  else if(input.match(frame)) return (null, input.match(frame), null, null)
  else if(input.match(heading)) return(null, null, input.match(heading), '<h1>'+input.match(heading)+'</h1>\n<hr>')
  else if(input.match(paragraph)) return(null, null, null, '<h3>'+input.match(paragraph)+'</h3>')
  else if(input.match(smallparagraph)) return(null, null, null, '<h5>'+input.match(smallparagraph)+'</h5>')
  else if(input === '') return(null, null, null, '<br/>') // style로 간격 줄여주기
  else if(input.match(annotation))
  return (null, null, null,input)
}

// ----으로 구분선
function check_dividingline(input){
  var dividing = /^----$/
  console.log("왜 renderfunction은 문제 없지?", input)
  if(input.match(dividing)) return ('<hr>')
  return(input)
}


// text shape
function textshape(input){
  var italic = /''/
  var bold = /'''/
  var bold_italic = /'''''/ 
  var output = input
  while(output.match(bold_italic)){
    output = output.replace(bold_italic, '<i><b>')
    output = output.replace(bold_italic, '</b></i>')
  }
  while(output.match(bold)){
    output = output.replace(bold, '<b>')
    output = output.replace(bold, '</b>')
  }
  while(output.match(italic)){
    output = output.replace(italic, '<i>')
    output = output.replace(italic, '</i>')
  }
  return(output)
}

function internal_frame(input){ //틀
  let 
}


function internal_link(input){
  let link_no_text = /(?<=\[\[)(.*)(?=\]\])/g // [[문서이름]] 형태 /(?<=\[\[)([^\|\[\]]*)(?=\]\])/g << 무슨 의미였는지 기억 잘 안남
  let link_text = /(?<=\[\[)(.*\|.*)(?=\]\])/g //[[문서이름|보일내용]] 의 문서이름 부분
  let output = input

  // if(output.match(link_no_text)){
  //   let no_text_count = output.match(link_no_text).length

  //   for(let i = 0 ; i < no_text_count ; i++){
  //     output = output.replace(/\[\[([^\|\[\]]*)\]\]/,`<a href="/docs/${input.match(link_no_text)[i]}">${input.match(link_no_text)[i]}</a>`)
  //   }
    while(output.match(link_no_text)){
      output = output.replace(link_no_text, `<a href="/docs/${input.match(link_no_text)[i]}">${input.match(link_no_text)[i]}</a>`)
    }
  }
  
  // if(output.match(link_text)){
  //   let text_count = output.match(link_text).length
    
  //   for(let i = 0 ; i < text_count ; i++){
  //     output = output.replace(/\[\[[^\|]*\|/,`<a href="어쩌구저쩌구/w/${input.match(link_text)[i]}">`)
  //     output = output.replace(/\]\]/, '</a>')
  //   }
  // }

  // https://bayaa.tistory.com/16

  return output
}

// 외부 링크
function external_link(input){
  var link = /(?<=\[\[)(.*)(?=\]\])/
  var output = input
  while(output.match(link)) {
    output = output.replace(/\[\[/,`<a href="어쩌구저쩌구/w/${input.match(link)[0]}">`)
    output = output.replace(/\]\]/, '</a>')
  }
  return output  
}

// 표
