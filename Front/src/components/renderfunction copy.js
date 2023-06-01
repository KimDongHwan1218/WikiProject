function findannotation(input){
  if(!input) {
    return []
  }

  return ([])
};

function findindex(input){
  if(!input) {
    return ''
  }
  var index = removehtml(input);
  index = index_line_by_line(index)


  return index
};

function renderfunction(input){
  if(!input) {
    return input
  }
  var value = removehtml(input);
  value = check_line_by_line(value)
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
    res = internal_link(res)
    res = internal_frame(res)
    
    output = output.concat(res,'\n')
  })
  return(output)
}

function index_line_by_line(input){
  input = input.toString().split("\n")
  var output = []
  input.forEach((value, index, array)=>{
    var val = check_index(value)
    if(val[1]) output.push(val)
  })

  var output_string = ''
  output.forEach((value, index, array)=>{
    console.log("Gggggggggggggggg", value[0])
    if (value[1]===1){
      output_string = output_string + `<a href=#${value[0][0].split(' ').join('')}>${value[0]}</a></br>`
    }
    if (value[1]===2){
      output_string = output_string + `<a href=#${value[0][0].split(' ').join('')}>${value[0]}</a></br>`
    }
    if (value[1]===3){
      output_string = output_string + `<a href=#${value[0][0].split(' ').join('')}>${value[0]}</a></br>`
    }
  })
  return(output_string)
}

// function check_classification(input){
//   var classification = //g
// }

// function check_frame(input){
//   var frame = //g
// }

// function check_annotation(input){
//   var annotation = //g
// }


function check_paragraph(input){
  var heading = /(?<=^==)([^=]+)(?===$)/g
  var paragraph = /(?<=^===)([^=]+)(?====$)/g
  var smallparagraph = /(?<=^====)([^=]+)(?=====$)/g

  if(input.match(heading)) return(`<h1 id=${input.match(heading)[0].split(' ').join('')}>`+input.match(heading)+'</h1><hr>')
  else if(input.match(paragraph)) return(`<h2 id=${input.match(paragraph)[0].split(' ').join('')}>`+input.match(paragraph)+'</h2>')
  else if(input.match(smallparagraph)) return(`<h3 id=${input.match(smallparagraph)[0].split(' ').join('')}>`+input.match(smallparagraph)+'</h3>')
  else if(input === '') return('<br/>') // style로 간격 줄여주기
  return(input)
}

function check_index(input){
  var heading = /(?<=^==)([^=]+)(?===$)/g
  var paragraph = /(?<=^===)([^=]+)(?====$)/g
  var smallparagraph = /(?<=^====)([^=]+)(?=====$)/g
  if(input.match(heading)) return([input.match(heading), 1])
  else if(input.match(paragraph)) return([input.match(paragraph), 2])
  else if(input.match(smallparagraph)) return([input.match(smallparagraph), 3])
  else return(['', 0])
}



// ----으로 구분선
function check_dividingline(input){
  var dividing = /^----$/
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
  var frame = /(?<=^\[include\(틀:)([^=]+)(?=\)\]$)/g
  if(input.match(frame)) return(`이거 링크가져와야함`+input.match(frame)+'이거<br>')
  return input
}

// function image_load(input){ // 페이지 주소를 받으면, 실제 image src 주소로 바꿔줘야함.
//   let image = /(?<=\[\[)(.*)(?=\]\])/g // 고쳐야함
//   var output = input
//   while(output.match(link)) {
//     output = output.replace(image, `<a href="어쩌구저쩌구/w/${input.match(link)[0]}">`)
//     output = output.replace(/\]\]/, '</a>')
//   }
//   return output
// }


function internal_link(input){
  let link_no_text = /(?<=\[\[)(.*)(?=\]\])/g // [[문서이름]] 형태 /(?<=\[\[)([^\|\[\]]*)(?=\]\])/g << 무슨 의미였는지 기억 잘 안남
  let link_text = /(?<=\[\[)(.*\|.*)(?=\]\])/g //[[문서이름|보일내용]] 의 문서이름 부분
  let output = input

  // if(output.match(link_no_text)){
  //   let no_text_count = output.match(link_no_text).length

  //   for(let i = 0 ; i < no_text_count ; i++){
  //     output = output.replace(/\[\[([^\|\[\]]*)\]\]/,`<a href="/docs/${input.match(link_no_text)[i]}">${input.match(link_no_text)[i]}</a>`)
  //   }
    // while(output.match(link_no_text)){
    //   output = output.replace(link_no_text, `<a href="/docs/${input.match(link_no_text)[i]}">${input.match(link_no_text)[i]}</a>`)
    // }

  
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
function table(input){
  var row = /(||)([^=]+)(||)/g
}

export {renderfunction, findannotation, findindex}