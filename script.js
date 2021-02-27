languagePluginLoader.then(() => {
	$(function() {
		// document.querySelectorAll('textarea.clipboard').forEach(e => {
		// 	e.setAttribute('hidden', "true")
		// })
		setInterval(() => {
			document.querySelectorAll('div.cursor-line').forEach(e => e.style = "background-color: transparent;position: absolute; top: 0; left: 29px; z-index: 1;");
			document.querySelectorAll('span.prompt').forEach(e => e.style = "z-index: 0;visibility: visible;"); 
			var cursor = document.querySelectorAll('span.blink')
			cursor.forEach(e => e.style.backgroundColor = "white");
			setTimeout(() => {
				cursor.forEach(e => e.style.backgroundColor = "transparent", 500)
			}, 500)
		}, 1000)
		pyodide.runPython(`
	    import sys
	    import io
	    sys.stdout = io.StringIO()
		`);
		pyodide.globals.sys.version = `3.8.2: Web Edition (default, Dec 25 2020, 21:20:57) 
		[Clang 6.0.1 (/b/s/w/ir/cache/git/chromium.googlesource.com-external-github.com`
			var term = $('#terminal')
			term.terminal(function(command) {
			pyodide.runPython(command);
			var stdout = pyodide.runPython("sys.stdout.getvalue()");
			term.echo(stdout);
			pyodide.runPython('sys.stdout = io.StringIO()')
		}, {
			greetings: `Python 3.8.2: Web Edition (default, Dec 25 2020, 21:20:57) 
[Clang 6.0.1 (/b/s/w/ir/cache/git/chromium.googlesource.com-external-github.com`
		}).echo('https://github.com/spidunno/Browser-Python \nhttps://github.com/iodide-project/pyodide').set_prompt('>>> ');
	});
});