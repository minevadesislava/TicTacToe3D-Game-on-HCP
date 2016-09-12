package com.sap.hana.cloud.tictactoe3d.model;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "TICTACTOEPLAYERS_TABLE")
@NamedQueries({@NamedQuery(name = "Players", query = "SELECT p FROM Player p"), 
	           @NamedQuery(name = "PlayersByName", query = "SELECT p FROM Player p WHERE p.name = :name")})

@XmlRootElement(name = "player")
@XmlAccessorType(XmlAccessType.FIELD)
public class Player extends BaseObject implements Serializable
{
	/**
	 * The <code>serialVersionUID</code> of the {@link FavoriteCity} class.
	 */
	private static final long serialVersionUID = 1L;

	@Column(name="NAME", length = 128, unique=true)
	String name = null;
	
	@Column(name="UNFINISHEDGAME")
	String unfinishedGame= null;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUnfinishedGame() {
		return unfinishedGame;
	}

	public void setUnfinishedGame(String unfinishedGame) {
		this.unfinishedGame = unfinishedGame;
	}

}
