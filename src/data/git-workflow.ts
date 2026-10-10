export const lanes = [
 {id:'working',name:'Working Directory',sub:'Tracked + untracked files',color:'#ef4135'},
 {id:'staging',name:'Staging Area',sub:'{ Index }',color:'#269fe6'},
 {id:'local',name:'Local Repo',sub:'{ HEAD }',color:'#65bf42'},
 {id:'remote',name:'Remote Repo',sub:'Shared repository',color:'#8f49c4'},
];
export const flows = [
 {id:'add',command:'git add <file>',from:0,to:1,kind:'write',note:'Stage the selected file content for the next commit.'},
 {id:'commit',command:'git commit -m "message"',from:1,to:2,kind:'write',note:'Record the staged snapshot in local history.'},
 {id:'commit-all',command:'git commit -a -m "message"',from:0,to:2,kind:'write',note:'Stage tracked modifications and deletions, then commit. New untracked files still need git add.'},
 {id:'push',command:'git push',from:2,to:3,kind:'write',note:'Send local commits and update the configured remote branch.'},
 {id:'merge',command:'git merge <branch>',from:2,to:0,kind:'integrate',note:'Integrate another branch into the current branch; update the index and working tree. Conflicts may need resolving.'},
 {id:'fetch',command:'git fetch',from:3,to:2,kind:'write',note:'Download objects and update remote-tracking refs. Your checked-out branch and working files stay unchanged.'},
 {id:'pull',command:'git pull',from:3,to:0,kind:'integrate',note:'Fetch, then integrate into the current branch. The configured strategy may fast-forward, merge or rebase.'},
 {id:'diff-head',command:'git diff HEAD',from:0,to:2,kind:'compare',note:'Compare tracked working-tree content with HEAD, including staged and unstaged differences.'},
 {id:'diff-staged',command:'git diff --staged [<commit>]',from:1,to:2,kind:'compare',note:'Compare the index with a commit; HEAD is the default.'},
 {id:'diff-cached',command:'git diff --cached [<commit>]',from:1,to:2,kind:'compare',note:'An exact synonym for git diff --staged.'},
 {id:'diff-commit',command:'git diff <commit-or-branch>',from:0,to:2,kind:'compare',note:'Compare tracked working-tree content with the specified commit or branch tip.'},
 {id:'diff',command:'git diff',from:0,to:1,kind:'compare',note:'Compare tracked working-tree content with the index: the unstaged changes.'},
];
