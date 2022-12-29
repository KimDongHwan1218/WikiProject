const editor = document.getElementById('editor');
const rendered = document.getElementById('rendered');
const renderButton = document.getElementById('renderButton');

renderButton.addEventListener('click', ()=>{
  let value = editor.value
  value = removehtml(value)

  value = check_line_by_line(value)

  rendered.innerHTML = value
});

// 태그 제거
function removehtml(output){
  output = output.replace(/</g,'&lt;');
  output = output.replace(/<\//g,'&lt;/');
  output = output.replace(/>/,'&gt;');
  return output
}


function check_line_by_line(input){
  input = input.toString().split("\n")
  let output = ''
  input.forEach((value, index, array)=>{
    let res = value
    res = check_paragraph(value) 
    res = check_dividingline(res)
    res = textshape(res)
    res = hyperlink(res)
    output = output.concat(res,'\n')
  })
  return(output)
}

// ==h2== ===h3=== ====h4==== =====h5===== ======h6====== 엔터두번은 줄바꿈
// h1은 문서 제목에만 씀, 문단 제목은 h2
// h2 밑줄은 hr태그 쓰는게 아니라 나중에 따로 css에서 h2 태그에 border-bottom 스타일로 해야함
function check_paragraph(input){
  let h2 = /(?<=^==)([^=]+)(?===$)/g
  let h3 = /(?<=^===)([^=]+)(?====$)/g
  let h4 = /(?<=^====)([^=]+)(?=====$)/g
  let h5 = /(?<=^=====)([^=]+)(?======$)/g
  let h6 = /(?<=^======)([^=]+)(?=======$)/g

  if(input.match(h2)) return('<h2>'+input.match(h2)+'</h2>')
  else if(input.match(h3)) return('<h3>'+input.match(h3)+'</h3>')
  else if(input.match(h4)) return('<h4>'+input.match(h4)+'</h4>')
  else if(input.match(h5)) return('<h5>'+input.match(h5)+'</h5>')
  else if(input.match(h6)) return('<h6>'+input.match(h6)+'</h6>')
  else if(input == '') return('<br/>')
  return(input)
}

// ----으로 구분선
function check_dividingline(input){
  let dividing = /^----$/
  if(input.match(dividing)) return ('<hr>')
  return(input)
}

// text shape
function textshape(input){
  let italic = /''/
  let bold = /'''/
  let bold_italic = /'''''/ 
  let output = input
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
  let link = /(?<=\[\[)(.*)(?=\]\])/
  let output = input
  while(output.match(link)) {
    output = output.replace(/\[\[/,`<a href="어쩌구저쩌구/w/${input.match(link)[0]}">`)
    output = output.replace(/\]\]/, '</a>')
  }
  return output
}