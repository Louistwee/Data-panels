# jQuery-Plugins

## Wiki

[Wiki](../../wiki)

## To Do

Look for open Issues

## Example

[link](https://louistwee.github.io/jQuery-Plugins/Examples/example.html)

```html
  <html>
  <head>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="../Files/Connector.js"></script>
    <script src="../Files/ConnectBox.js"></script>
    <script src="../Files/typeToColor.js"></script>
  </head>
  <body>
    <div id="outputDiv"><input id="output" value="1" placeholder="number" type="number"></div>
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <div id="inputDiv"><input id="input"></div>
    <script>
      $(function(){
        //Connector
        var output = $.connector({
          type:"output",
          dataType:'number',
          element:$('#output')[0],
        });
        var input = $.connector({
          type:"input",
          dataType:'string',
          element:$('#input')[0],
        });
        //ConnectBox
        var inp = $.connectBox(input);
        var out = $.connectBox(output);
        $('#inputDiv').append(inp);
        $('#outputDiv').append(out);
        //line - alt: fn.connect
        output.connect(input);
      })
    </script>
  </body>
</html>
```
