var qsBuilder = {
	build: function(table, req){
		var qstring = 'SELECT * FROM ' + table;
		if(req.query.filter){
			var filters = req.query.filter.split(',');
			var operators = req.query.operator.split(',');
			var values = req.query.value.split(',');
			qstring += ' where';
			for(var i=0;i<filters.length;i++){
				if(i > 0)
					qstring += ' and';
				qstring += ' ' + filters[i] + ' ' + operators[i] + ' "' + values[i] + '"';
			}
		}
		if(req.query.by){
			qstring += ' order by ' + req.query.by;
			if(req.query.order){
				qstring += ' ' + req.query.order; 
			}
		}
		return qstring;
	}
};
module.exports = qsBuilder;
