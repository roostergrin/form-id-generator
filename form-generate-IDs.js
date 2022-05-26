      // module pattern to avoid polluting the global namespace
      // to use the script, use generateIDs.run()
      let generateIDs = (function () {
        function run() {
          let inputs = [...document.getElementsByTagName('input')]
          let i = 1
          // checkRadioNames(inputs)
          setTextAndCheckboxIDs(inputs, i)
          setRadioIDs(inputs, i)
          setSignatureIDs(i)
          generateFile()
        }

        // // the script isn't smart enough to group the radios, the user has to do it
        // function checkRadioNames(inputs) {
        //   inputs.forEach((input) => {
        //     if (input.type === 'radio' && input.name === '') {
        //       alert(
        //         'Sorry, the script needs your help. Please make sure every radio input has a name. (and remember: the name is what groups individual radios together)',
        //       )
        //       throw new Error()
        //     }
        //   })
        // }

        // texts and checkboxes are pretty straightforward
        function setTextAndCheckboxIDs(inputs, i) {
          inputs.forEach((input) => {
            switch (input.type) {
              case 'text':
                input.setAttribute('id', i)
                input.setAttribute('name', i)
                i++
                break
              case 'checkbox':
                input.setAttribute('id', i)
                input.setAttribute('name', i)
                input.setAttribute('value', i)
                i++
                break
            }
          })
        }

        // relies on all radios in a group being children of the same div
        // otherwise, you have to name them by hand to group them and use the next function
        function setRadioIDs() {
          let inputs = [...document.getElementsByTagName('input')]
          let radios = inputs.filter((input) => input.type === 'radio')
          let parentsAll = []
          radios.forEach((radio) => parentsAll.push(radio.parentNode))
          let parents = parentsAll.filter(
            (parent, i, arr) => arr.indexOf(parent) === i,
          )
          // each name represents a group of radios
          parents.forEach((parent, j) => {
            let radioGroup = radios.filter(
              (radio) => radio.parentNode === parent,
            )
            radioGroup.forEach((radio, k) => {
              radio.setAttribute('name', 'radio-' + j)
              if (k == 0) {
                radio.setAttribute('id', radio.name)
                radio.setAttribute('value', radio.name)
              } else {
                radio.setAttribute('id', radio.name + '-' + k)
                radio.setAttribute('value', radio.name + '-' + k)
              }
            })
          })
        }

        // // radios are trickier
        // function setRadioIDs(inputs) {
        //   // get all radios
        //   let radios = inputs.filter((input) => input.type === 'radio')
        //   // get all the names
        //   let radioNamesAll = []
        //   radios.forEach((radio) => radioNamesAll.push(radio.name))
        //   // get the unique names
        //   let radioNames = radioNamesAll.filter(
        //     (name, j, arr) => arr.indexOf(name) === j,
        //   )
        //   // each name represents a group of radios
        //   radioNames.forEach((radioName) => {
        //     let radioGroup = radios.filter((radio) => radio.name === radioName)
        //     radioGroup.forEach((radio, k) => {
        //       if (k == 0) {
        //         radio.setAttribute('id', radio.name)
        //         radio.setAttribute('value', radio.name)
        //       } else {
        //         radio.setAttribute('id', radio.name + '-' + k)
        //         radio.setAttribute('value', radio.name + '-' + k)
        //       }
        //     })
        //   })
        // }

        // signatures are tricky too
        // the form prob has the sform script. so when you open it, the script will create the canvas, etc
        // replacing the innerHTML wipes all that out
        // using a string with the script inside is a way to insert a script without running it
        // note the string doesn't include a closing script tag. it's a bug workaround
        function setSignatureIDs() {
          let signatures = [...document.getElementsByClassName('signature')]
          signatures.forEach((signature, l) => {
            let script = `
        <script>
          new sform.Signature({
            id: "Signature${l + 1}",
            form_name: "myform",
            field_name: "Signature${l + 1}",
            caption: "Signature",
            w: 548,
            h: 80,
          })
      `
            signature.innerHTML = script
          })
        }

        function generateFile() {
          let url = window.location.pathname
          let origFilename = url.substring(url.lastIndexOf('/') + 1)
          let newFilename =
            origFilename.split('.').slice(0, -1).join('.') + '-IDs.html'
          let a = document.createElement('a')
          a.href = window.URL.createObjectURL(
            new Blob([document.documentElement.outerHTML], {
              type: 'text/plain',
            }),
          )
          a.download = newFilename
          a.click()
        }

        return {
          run,
        }
      })()
