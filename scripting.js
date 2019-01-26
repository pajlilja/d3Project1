function changeGroup(group, id) {
    var groupheader = document.getElementById('groupHeader');
    groupheader.innerHTML = group;
    currentActiveGroup = id;
    document.getElementById('groupListContainer').innerHTML =
    `<ul class="list-group listGroups">
            <li class="list-group-item">`+groups[currentActiveGroup][0]+`</li>
            <li class="list-group-item">`+groups[currentActiveGroup][1]+`</li>
            <li class="list-group-item">`+groups[currentActiveGroup][2]+`</li>
            <li class="list-group-item">`+groups[currentActiveGroup][3]+`</li>
            <li class="list-group-item">`+groups[currentActiveGroup][4]+`</li>
            <li class="list-group-item">`+groups[currentActiveGroup][5]+`</li>
    </ul>`
}

changeGroup("Group 1", 0);

function getPersons(skill, digit) {
    var list = []
    data.forEach(e => {
        if(e[skill] === digit) {
            list.push(e);
        }
    })
    return list;
}

function setActive(el, name) {
    if(el.classList.contains("bg-primary")) {
        el.classList.remove("bg-primary");
        currentActivePerson = "";
        currentActivePersonName = "";
    } else {
        el.classList.add("bg-primary");
        if(currentActivePerson != "") {
            document.getElementById(currentActivePerson).classList.remove("bg-primary")
        }
        currentActivePerson = el.id;
        currentActivePersonName = name;
    }
}

function addToGroup() {
    for(var i = 0; i < groups[currentActiveGroup].length; i++) {
        if(groups[currentActiveGroup][i] === "Person") {
            if(currentActivePersonName != "") {
                groups[currentActiveGroup][i] = currentActivePersonName;
                break;
            }
        }
    }
    var number = currentActiveGroup+1;
    changeGroup("Group "+number, currentActiveGroup)
}

function createDetails(persons) {
    var backbutton = document.getElementById("backbutton");
    backbutton.style.cssText = 'display:inline-block !important';
    var tableContainer = document.getElementById('Result');
    var tableHead = `<table class="table table-hover">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Name</th>
        <th scope="col">Interest</th>
      </tr>
    </thead>
    <tbody id="tableBody"></tbody>
    </table>`;
    tableContainer.innerHTML = tableHead;
    var tbodyContainer = document.getElementById('tableBody');
    var counter = 1;
    persons.forEach(e => {
        var name = e.name;
        var newEntry = `<tr id="tdElement`+counter+`" onclick="setActive(this,'`+name+`')">
        <th scope="row">`+counter+`</th>
        <td>`+e.name+`</td>
        <td>`+e.interests+`</td>
      </tr>`
      tbodyContainer.innerHTML += newEntry;
      counter += 1;
    });
}

function createtables() {
    var backbutton = document.getElementById("backbutton");
    backbutton.style.cssText = 'display:none !important';
    var button = document.getElementById("visualizeButton");
    var header = document.getElementById("detailsText");
        header.style.display = "none";
    button.style.display = "none";
    var grid = document.getElementById("grid");
    grid.style.display = "grid";
    var details = document.getElementById("Result");
    details.style.display = "none";
    button.style.display = "none";
    var sidebar = document.getElementById("sidebar");
    sidebar.style.display = "block";
    var visualizationskill = [];
    var statisticalskill = [];
    var mathematicsskill = []
    var artisticskill = []
    var computerskill = []
    var programmingskill = []
    var graphicsprogrammingskill = []
    var hciskill = []
    var evaluationskill = []
    var communicationskill = []
    var collaborationskill = []
    var repositoryskill = []
    for(var i = 0; i<10;i++) {
        visualizationskill.push(0);
        statisticalskill.push(0);
        mathematicsskill.push(0);
        artisticskill.push(0);
        computerskill.push(0);
        programmingskill.push(0);
        graphicsprogrammingskill.push(0);
        hciskill.push(0);
        evaluationskill.push(0);
        communicationskill.push(0);
        collaborationskill.push(0);
        repositoryskill.push(0);
    }
    data.forEach(e => {
        visualizationskill[e.visualizationskill-1] += 1;
        statisticalskill[e.statisticalskill-1] += 1
        mathematicsskill[e.mathematicsskill-1] += 1
        artisticskill[e.artisticskill-1] += 1
        computerskill[e.computerskill-1] += 1
        programmingskill[e.programmingskill-1] += 1
        graphicsprogrammingskill[e.graphicsprogrammingskill-1] += 1
        hciskill[e.hciskill-1] += 1
        evaluationskill[e.evaluationskill-1] += 1
        communicationskill[e.communicationskill-1] += 1
        collaborationskill[e.collaborationskill-1] += 1
        repositoryskill[e.repositoryskill-1] += 1
    });

    FUNCU(visualizationskill, "visualizationskill", questions[0]);
    FUNCU(statisticalskill, "statisticalskill", questions[1]);
    FUNCU(mathematicsskill, "mathematicsskill", questions[2]);
    FUNCU(artisticskill, "artisticskill",  questions[3]);
    FUNCU(computerskill, "computerskill", questions[4]);
    FUNCU(programmingskill, "programmingskill", questions[5]);
    FUNCU(graphicsprogrammingskill, "graphicsprogrammingskill", questions[6]);
    FUNCU(hciskill, "hciskill", questions[7]);
    FUNCU(evaluationskill, "evaluationskill", questions[8]);
    FUNCU(communicationskill, "communicationskill", questions[9]);
    FUNCU(collaborationskill, "collaborationskill", questions[10]);
    FUNCU(repositoryskill, "repositoryskill", questions[11]);
}

function FUNCU(list, element, question="") {
    var svgContainer = d3.select(".svg-container" + element);
    var svg = d3.select("."+element),
    margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = parseInt(svgContainer.style("width"))*1.2 - margin.left - margin.right,
    height = parseInt(svgContainer.style("height"))*0.7 - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
        .domain(list.map(function(d,i){return i+1;}))
	    .rangeRound([0, width/2])
        .padding(0.5);

    var y = d3.scaleLinear()
        .domain([0, 20])
	    .rangeRound([height, 0]);

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("transform", "translate(-20,-20)")
        .append("text")
        .attr("fill", "#000")
        .attr("dy", "0.71em")
        .style("font-size", 13)
        .text(question);

    g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Total Votes");

    var div = d3.select(".tooltip");

    g.selectAll(".bar")
	    .data(list)
        .enter().append("rect")
        .attr("class", "bar")
        .on("click", function(d, i) {
            d3.select(".grid-container").style("display", "none");
            var details = document.getElementById("Result");
            details.style.display = "block";
            var header = document.getElementById("detailsText");
            header.style.display = "block";
            var skilllevel = i+1;
            d3.select(".detailsText").html(question+"<br/> People that chose skill level "+skilllevel)
            var persons = getPersons(element, i+1);
            createDetails(persons);
        })
        .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html(d + " people with this skill")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        })
        .attr("x", function (d,i) {
            return x(i+1);
        })
        .attr("y", function (d) {
            return y(d);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d);
        });
}

