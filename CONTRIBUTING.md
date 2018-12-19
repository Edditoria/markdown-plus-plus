# Contribution Guildlines

> *tl;tr* For pull request, please do check **Allow edits from maintainers**, and merge from **your new branch** into **my master branch**; Or, propose a file change in Github directly; Or, hit me a message via issue page or my social contacts.

## Fork and Pull Model

If you are going to create a new theme, new feature or fix a bug, please follow the "fork and pull" model:

1. Before writing codes, as you know:
	1. Click the nice **fork** button in <https://github.com/Edditoria/markdown-plus-plus>
	2. In Power Shell / Command Prompt, `git clone https://github.com/{your.username}/markdown-plus-plus.git`
	3. `git remote add upstream https://github.com/Edditoria/markdown-plus-plus.git` for fetch and merge in future
1. Create a new branch according to what you've gotta do:
	- `git checkout -b theme/{theme-name} {master}` to create a new color scheme for a theme.
	- `git checkout -b hotfix/{fix-a-bug} {master}` to fix a bug on current codes.
	- `git checkout -b feature/{awesome-feature} {master}` to create awesome features.
1. Work on your codes... (Thanks!!)
1. Before `commit -am`, please make some manual test, e.g. use the `test.md` file.
1. Push to your Github `git push origin feature/{awesome-feature}`
1. In Github, go to my [markdown-plus-plus repo](https://github.com/Edditoria/markdown-plus-plus/)
1. Click the nice **Compare & pull request** button
1. :warning: Remember to pull to **master branch**. Make sure:
	- [ ] "base fork: Edditoria/markdown-plus-plus" and "base: master"
	- [ ] "head fork: {your.name}/markdown-plus-plus" and "compare: {awesome-feature}"
	- [ ] In the the right sidebar of your pull request, select **Allow edits from maintainers**.
	- [ ] Leave a comment to me. Click "Create pull request".

In general case, I will:

1. create a new branch,
2. evaluate your awesome codes,
3. communicate with you and further edit,
4. commit and merge it back into master branch.

After your pull request is merged, you can safely erase your branch and pull the changes from my repo:

1. `git push origin --delete feature/{awesome-feature}`
2. `git checkout master -f`
3. `git branch -D feature/{awesome-feature}`
4. `git pull --ff upstream master`

## Proposing File Change

Sometimes you may want to fix a typo, or do some small changes that doesn't need a test, you can **propose file change** directly.

> reference: [Editing files in another user's repository - *Github Help*](https://help.github.com/articles/editing-files-in-another-user-s-repository/)

## Make a Wish / Ask a Question?

Want a scheme for your favourite theme? Suggest a more adaptive color? Please leave me a message in [issue page](https://github.com/Edditoria/markdown-plus-plus/issues)

If you are shy in Github, feel free to connect me via <edditoria@gmail.com> | [@Edditoria][twitter] | [facebook][] | [G+][gplus].

:beer: Thank you so much for your contribution!! :pray:

[twitter]: http://twitter.com/Edditoria
[facebook]: http://www.facebook.com/Edditoria
[gplus]: https://plus.google.com/+Edditoria
