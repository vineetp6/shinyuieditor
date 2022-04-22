# Real UI snapshot

    Code
      parse_ui_fn(rlang::expr(gridlayout::grid_page(layout = "\n            | 1rem | 250px   | 1fr  |\n            |------|---------|------|\n            | 1fr  | sidebar | plot |",
        gridlayout::vertical_stack_panel(area = "sidebar", item_alignment = "center",
          shiny::sliderInput(inputId = "bins", label = "Num Bins", min = 10L, max = 100L,
            value = 40L)), gridlayout::vertical_stack_panel(area = "plot",
          item_alignment = "center", shiny::plotOutput(outputId = "distPlot", height = "100%")))))
    Output
      $uiName
      [1] "gridlayout::grid_page"
      
      $uiArguments
      $uiArguments$layout
      [1] "\n            | 1rem | 250px   | 1fr  |\n            |------|---------|------|\n            | 1fr  | sidebar | plot |"
      
      
      $uiChildren
      $uiChildren[[1]]
      $uiChildren[[1]]$uiName
      [1] "gridlayout::vertical_stack_panel"
      
      $uiChildren[[1]]$uiArguments
      $uiChildren[[1]]$uiArguments$area
      [1] "sidebar"
      
      $uiChildren[[1]]$uiArguments$item_alignment
      [1] "center"
      
      
      $uiChildren[[1]]$uiChildren
      $uiChildren[[1]]$uiChildren[[1]]
      $uiChildren[[1]]$uiChildren[[1]]$uiName
      [1] "shiny::sliderInput"
      
      $uiChildren[[1]]$uiChildren[[1]]$uiArguments
      $uiChildren[[1]]$uiChildren[[1]]$uiArguments$inputId
      [1] "bins"
      
      $uiChildren[[1]]$uiChildren[[1]]$uiArguments$label
      [1] "Num Bins"
      
      $uiChildren[[1]]$uiChildren[[1]]$uiArguments$min
      [1] 10
      
      $uiChildren[[1]]$uiChildren[[1]]$uiArguments$max
      [1] 100
      
      $uiChildren[[1]]$uiChildren[[1]]$uiArguments$value
      [1] 40
      
      
      
      
      
      $uiChildren[[2]]
      $uiChildren[[2]]$uiName
      [1] "gridlayout::vertical_stack_panel"
      
      $uiChildren[[2]]$uiArguments
      $uiChildren[[2]]$uiArguments$area
      [1] "plot"
      
      $uiChildren[[2]]$uiArguments$item_alignment
      [1] "center"
      
      
      $uiChildren[[2]]$uiChildren
      $uiChildren[[2]]$uiChildren[[1]]
      $uiChildren[[2]]$uiChildren[[1]]$uiName
      [1] "shiny::plotOutput"
      
      $uiChildren[[2]]$uiChildren[[1]]$uiArguments
      $uiChildren[[2]]$uiChildren[[1]]$uiArguments$outputId
      [1] "distPlot"
      
      $uiChildren[[2]]$uiChildren[[1]]$uiArguments$height
      [1] "100%"
      
      
      
      
      
      
