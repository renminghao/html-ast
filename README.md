# html-ast
html的AST解析
# parse 
`dom只能有一个根节点`
```javascript
   import {Parse} from '../dist/index';
   const result = Parse(`htmlString`)
```
result
```json
	{
	  "name": tagName,
	  "attr": [{}...],
	  "closeSelf": boolean,
	  "status": start|end,
	  "children": [{}...]
	}
```
# compile 
`parse的结果作为入参`
```javascript
	import {Compile} from '../dist/index';
	Compile(data);
```
result
```json
<form name='searchTop' action='//list.tmall.com/search_product.htm' class='mallSearch-form clearfix' target='_top' acceptCharset='gbk' ><fieldset ><legend > 天猫搜索</legend><div class='mallSearch-input clearfix' ><label for='mq' > 搜索 天猫 商品/品牌/店铺</label><div class='s-combobox' ><div class='s-combobox-input-wrap' ><input type='text' name='q' accesskey='s' autocomplete='off' x-webkit-speech='' x-webkit-grammar='builtin:translate' value='' id='mq' autocomplete='off' ></input></div></div><button type='submit' > 搜索<s ></s></button><input id='J_Type' type='hidden' name='type' value='p' ></input><input id='J_MallSearchStyle' type='hidden' name='style' value='' ></input><input id='J_Cat' type='hidden' name='cat' value='all' ></input><input type='hidden' name='vmarket' value='' ></input></div></fieldset><a href='//tmall.com' ><span > test</span></a></form>
```