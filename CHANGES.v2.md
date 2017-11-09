# Important Changes from v1 to v2

- [ ] Master branch is migrated to branch `release/2.0.0`

	> The branch `release/2.0.0` is developed base on the branch `feature/emphasis-multiple-words`, which is tagged `v2.0-beta`

- [ ] In v2, the new highlighting mechanism is called "modern"; The old mechanism is still available as "classic" (see file structure)
- [ ] That is: There are 2 builds for each theme in v2
- [ ] The modern build mainly improves \**multiple \<em\> words*\* but not supports `* bullet points` anymore; whereas classic build (originally in v1.x) stay safe but more limitations
- [ ] Adapt UDL 2.1 that may improve a lot
- [ ] Adapting UDL 2.1 is probably break in old Notepad++
- [ ] Improves repo conventions
	- Semantic versioning
	- Add `.gitignore`
	- Commit messages (affects CONTRIBUTING)
	- `folder-name` rather than `folder_name`; `file-name.suffix.ext` rather than `file_name_suffix.ext`
	- `[Tab]` \> `[space]` (sorry :worried:)
