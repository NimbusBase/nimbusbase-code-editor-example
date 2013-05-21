function toggleMenuPanel()
{
    $('.modal').removeClass('active');
    toggle_slide();
}

function showFileList()
{
    var listHtml = '';
    var files = CodeFile.all();
    
    for (var i in files)
    {
        var file = files[i];
        listHtml += '<li> <a href="javascript:;" onclick="editCodeFile('+ file.id +')">' + file.name + '<span class="chevron"></span></a></li>';
    }

    $('#code-file-list').html(listHtml);

    toggleMenuPanel();

    $('.modal').removeClass('active');
    $('#codeFileListModal').addClass('active');
}

function newCodeFile()
{
    $('#code-id').val(0);
    $('#code-title').val('click here to edit file name');
    $('#code-lang').val('javascript');  
    codeMirror.setValue('');
    codeMirror.setOption('mode', 'javascript')

    $('.modal').removeClass('active');  

    toggleMenuPanel();
}

function editCodeFile(id)
{
    var file = CodeFile.find(id);

    $('#code-id').val(id);
    $('#code-title').val(file.name);
    $('#code-lang').val(file.lang); 
    codeMirror.setValue(file.content);
    codeMirror.setOption('mode', file.lang)

    $('.modal').removeClass('active');  
}

function showLangList()
{
    toggleMenuPanel();

    $('.modal').removeClass('active');
    $('#chooseLangModal').addClass('active');
}

function chooseLang(lang)
{
    codeMirror.setOption('mode', lang);
    $('#code-lang').val(lang);

    $('.modal').removeClass('active');  
}

function syncCodeFile()
{
    CodeFile.sync_all();
    toggleMenuPanel();
}

function saveFile()
{
    var fileId = parseInt($('#code-id').val());
    var title = $('#code-title').val();
    if (title.length < 1)
    {
        alert('Please add a name for your code file :)');
        return;
    }

    var codes = codeMirror.getValue();
    var lang = $('#code-lang').val();

    AddCodeFile(fileId, title, codes, lang);
}

// use upper case, model related
function AddCodeFile(id, name, content, lang)
{
    if (id == 0) id = CodeFile.count() + 1;
    var created = Math.round(new Date().getTime()/1000);
    var updated = created;
    var name = name;
    var content = content;
    var lang = lang;
    CodeFile.create({
        'id' : id,
        'created' : created,
        'updated' : updated,
        'name' : name,
        'content' : content,
        'lang' : lang
    });

    CodeFile.sync_all();

    $('#code-id').val(id);
}

// use upper case, model related
function DeleteCodeFile(id)
{
    CodeFile.find(id).destroy();
    CodeFile.sync_all();
}

function logout()
{
    window.localStorage.clear();
    toggleMenuPanel();
    $('#loginModal').addClass('active');
}