# Markdown NPP

## Test document

This document tests Markdown highlighting features.

Firstly, a single *italic* or **bold** or otherwise _emphasised_ word.
A run of *italic words together* or **bold words together** or an _emphasised passage_ should work too.

Emphasis can be used in the middle of a word:

un*frigging*believable

Markdown allows you to use backslash escapes to generate literal characters which would otherwise have special meaning in Markdown’s formatting syntax. For example, if you wanted to surround a word with literal asterisks (instead of an HTML `<em>` tag), you can use backslashes before the asterisks, like this:

\*literal asterisks\*

----

A single word of `inline` code or longer `inline code` phrase.
To include a literal backtick character within a code span,
you can use multiple backticks as the opening and closing delimiters:

``There is a literal backtick (`) here.``

----

A block of code follows:

	int myThing()
	{
		return 2 + 2;
	}
	
----

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit.

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
id sem consectetuer libero luctus adipiscing.

Blockquotes can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a header.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
> 
> Here's some example code:
> 
>     return shell_exec("echo $input | $markdown_script");

----

Here are bullet points represented all the different valid ways:

	* First point
	+ Second point
	- Third point
	
Now some longer bullet points:

	- 	A point which is a bit longer and 
		drops down onto another line.
		
		In fact it even has another paragraph, which is fine.
		
	-	Another point in the same format as the third
	
Here is a numbered list:

	1. Write code
	2. Test code
	3. Drink coffee
		3.1 Eat a biscuit
		
----

This text will catch any formatting which has overflowed from a delimiter.
