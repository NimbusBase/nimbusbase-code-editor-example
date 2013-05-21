toggleMenuPanel = ->
    $('.modal').removeClass('active')
    toggle_slide()

showFileList = ->
    files = CodeFile.all()

    listHtml = ''
    for file in files
        listHtml += "<li> <a href=\"javascript:;\" onclick=\"editCodeFile('#{file.id}')\">#{file.name}<span class=\"chevron\"></span></a></li>"
    
    $('#code-file-list').html(listHtml)
    toggleMenuPanel()
    $('.modal').removeClass('active')
    $('#codeFileListModal').addClass('active')

newCodeFile = ->
    $('#code-id').val(0)
    $('#code-title').val('click here to edit file name')
    $('#code-lang').val('javascript')
    
    codeMirror.setValue('')
    codeMirror.setOption('mode', 'javascript')
    $('.modal').removeClass('active')
    toggleMenuPanel()


editCodeFile = (id) ->
    file = CodeFile.find(id)
    $('#code-id').val(id)
    $('#code-title').val(file.name)
    $('#code-lang').val(file.lang)
    
    codeMirror.setValue(file.content)
    codeMirror.setOption('mode', file.lang)
    $('.modal').removeClass('active')


showLangList = ->
    toggleMenuPanel()
    $('.modal').removeClass('active')
    $('#chooseLangModal').addClass('active')


chooseLang = (lang) ->
    codeMirror.setOption('mode', lang)
    $('#code-lang').val(lang)
    $('.modal').removeClass('active')


syncCodeFile = ->
    CodeFile.sync_all()
    toggleMenuPanel()


saveFile = ->
    fileId = '' + $('#code-id').val()
    title = $('#code-title').val()
    if title.length < 1
        alert('Please add a name for your code file :)')
        return

    codes = codeMirror.getValue()
    lang = $('#code-lang').val()

    AddCodeFile(fileId, title, codes, lang)

# use upper case, model related
AddCodeFile = (id, name, content, lang) ->
    updated = Math.round(new Date().getTime()/1000)
    if id == '0'
        created = Math.round(new Date().getTime()/1000)
        updated = created
        file = CodeFile.create({
            'id' : id,
            'created' : created,
            'updated' : updated,
            'name' : name,
            'content' : content,
            'lang' : lang
        })
        id = file.id
    else
        file = CodeFile.find(id)
        file.updated = updated
        file.name = name
        file.content = content
        file.lang = lang
        file.save()

    CodeFile.sync_all()
    $('#code-id').val(id)

# use upper case, model related
DeleteCodeFile = (id) ->
    CodeFile.find(id).destroy()
    CodeFile.sync_all()

logout = ->
    window.localStorage.clear()
    toggleMenuPanel()
    $('#loginModal').addClass('active')