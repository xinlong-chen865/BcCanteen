function random(min, max){
	let num = Math.floor(Math.random()*(max-min)+min);
	return num;
}
function createCode(){
	let code = '';
	let codeLength = 15;
	let randomCode = [0,1,2,3,4,5,6,7,8,9,0,'q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
	for(let i=0;i<codeLength;i++){
		let index = random(0,36);
		code += randomCode[index];
	}
	return code;
}

const serialNum = createCode();

module.exports = {serialNum}
	