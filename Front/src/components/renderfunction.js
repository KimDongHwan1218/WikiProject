export default function renderfunction(input){

  if(!input) return input
  var value = removehtml(input);

  value = check_line_by_line(value)
  console.log(value)

  return value
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
  var output = ''
  input.forEach((value, index, array)=>{
    var res = check_paragraph(value) 
    res = check_dividingline(res)
    res = textshape(res)
    res = hyperlink(res)
    output = output.concat(res,'\n')
  })
  return(output)
}

function check_paragraph(input){
  var heading = /(?<=^==)([^=]+)(?===$)/g
  var paragraph = /(?<=^===)([^=]+)(?====$)/g
  var smallparagraph = /(?<=^====)([^=]+)(?=====$)/g
  if(input.match(heading)) return('<h1>'+input.match(heading)+'</h1>\n<hr>')
  else if(input.match(paragraph)) return('<h3>'+input.match(paragraph)+'</h3>')
  else if(input.match(smallparagraph)) return('<h5>'+input.match(smallparagraph)+'</h5>')
  else if(input === '') return('<br/>') // style로 간격 줄여주기
  return(input)
}

// ----으로 구분선
function check_dividingline(input){
  var dividing = /^----$/
  console.log("왜 renderfunction은 문제 없지?", input)
  if(input.match(dividing)) return ('<hr>')
  return(input)
}

// // 엔터 두번으로 문단 구분
// function check_

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

function hyperlink(input){
  var link = /(?<=\[\[)(.*)(?=\]\])/
  var output = input
  while(output.match(link)) {
    output = output.replace(/\[\[/,`<a href="어쩌구저쩌구/w/${input.match(link)[0]}">`)
    output = output.replace(/\]\]/, '</a>')
  }
  return output
}