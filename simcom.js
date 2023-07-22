
const BUILDING_COOKIE="change befor use";
const SALE_COOKIE="change befor use";
const HighQ_or_LowQ=2;//Higher than HighQ_or_LowQ will be identified as high quality, lower than HighQ_or_LowQ will be identified as low quality

const sale_name=[//I am a Chinese user, so my pages are all in Chinese, you can change the name here to the language of your page
	"亚轨道火箭",      //Sor
	"喷气客机",        //Jumbo
	"单引擎飞机",      //Sep
	"人造卫星",        //Sat
	"豪华飞机",        //Lux
	"BFR"            //BFR
]

const buildingOpt = {
	url: "https://www.simcompanies.com/api/v2/companies/me/buildings/",
	headers: {
		'cookie': BUILDING_COOKIE
	}
}

const salesOpt = {
	urlStart: "https://www.simcompanies.com/api/v2/companies/buildings/",
	urlEnd: "/sales-orders/",
	headers: {
		'cookie': SALE_COOKIE
	}
}

var request = require('sync-request');

let sale = []
JSON.parse(request('GET', buildingOpt.url, buildingOpt).getBody()).forEach(e => {

	console.log("ready to load building: "+e.id);
	JSON.parse(request('GET', salesOpt.urlStart + e.id + salesOpt.urlEnd, salesOpt).getBody()).forEach(ee => {
		if (ee.resources.length > 0) {


			sale.push(ee)



		}
	});
});

function getReal(res) {


	let highArr = [], lowArr = [], objS = {};
	JSON.parse(res).forEach(e => {
		if (e.qualityBonus > HighQ_or_LowQ) {
			e.resources.forEach(ee => {
				objS = {}
				objS.name = ee.kind.name
				objS.amount = ee.amount
				highArr.push(objS)
			});
		} else {
			e.resources.forEach(ee => {
				objS = {}
				objS.name = ee.kind.name
				objS.amount = ee.amount
				lowArr.push(objS)
			});
		}
	});
	
	
	highArr = highArr.reduce((total, cur, index) => {
		let hasValue = total.findIndex(current => {
			return current.name === cur.name;
		});
		hasValue === -1 && total.push(cur);
		hasValue !== -1 && (total[hasValue].amount = total[hasValue].amount + cur.amount);
		return total;
	}, []);
	lowArr = lowArr.reduce((total, cur, index) => {
		let hasValue = total.findIndex(current => {
			return current.name === cur.name;
		});
		hasValue === -1 && total.push(cur);
		hasValue !== -1 && (total[hasValue].amount = total[hasValue].amount + cur.amount);
		return total;
	}, []);
	
	let real = "Buy HighQ ( 5 unit One time )\n"
	for(let i in highArr){
		if(highArr[i].name ===sale_name[0]){
			real+=highArr[i].amount+"  :re-91:  Sor\n"
		}
		if(highArr[i].name ===sale_name[1]){
			real+=highArr[i].amount+"  :re-95:  Jumbo\n"
		}
		if(highArr[i].name ===sale_name[2]){
			real+=highArr[i].amount+"  :re-97:  Sep\n"
		}
		if(highArr[i].name ===sale_name[3]){
			real+=highArr[i].amount+"  :re-99:  Sat\n"
		}
		if(highArr[i].name ===sale_name[4]){
			real+=highArr[i].amount+"  :re-96:  Lux\n"
		}
		if(highArr[i].name ===sale_name[5]){
			real+=highArr[i].amount+"  :re-94:  Bfr\n"
		}
	}
	
	real+="~\nBuy LowQ ( 5 unit One time )\n"
	
	for(let i in lowArr){
		if(lowArr[i].name ===sale_name[0]){
			real+=lowArr[i].amount+"  :re-91:  Sor\n"
		}
		if(lowArr[i].name ===sale_name[1]){
			real+=lowArr[i].amount+"  :re-95:  Jumbo\n"
		}
		if(lowArr[i].name ===sale_name[2]){
			real+=lowArr[i].amount+"  :re-97:  Sep\n"
		}
		if(lowArr[i].name ===sale_name[3]){
			real+=lowArr[i].amount+"  :re-99:  Sat\n"
		}
		if(lowArr[i].name ===sale_name[4]){
			real+=lowArr[i].amount+"  :re-96:  Lux\n"
		}
		if(lowArr[i].name ===sale_name[5]){
			real+=lowArr[i].amount+"  :re-94:  Bfr\n"
		}
	}
	
	console.log(real);

}


getReal(JSON.stringify(sale))
